
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const postSchema = z.object({
  title: z.string().min(5, { message: 'Judul minimal 5 karakter.' }),
  author: z.string().min(3, { message: 'Nama penulis minimal 3 karakter.' }),
  excerpt: z.string().min(10, { message: 'Kutipan minimal 10 karakter.' }).max(200, { message: 'Kutipan maksimal 200 karakter.' }),
  image: z.any().optional(),
  content: z.string().min(50, { message: 'Konten minimal 50 karakter.' }),
  tags: z.string().min(1, { message: 'Harus ada minimal satu tag.' }),
});

type PostFormValues = z.infer<typeof postSchema>;

type PostFormProps = {
  post?: Post;
};

export default function PostForm({ post }: PostFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.image_url || null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      author: post?.author || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      tags: post?.tags.join(', ') || '',
    },
  });
  
  const imageRef = form.register("image");
  const contentValue = form.watch('content');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: PostFormValues) {
    setIsSubmitting(true);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        toast({ variant: 'destructive', title: 'Error', description: 'Anda harus login untuk membuat postingan.' });
        setIsSubmitting(false);
        return;
    }

    try {
      let imageUrl = post?.image_url || '';
      const imageFile = values.image?.[0];

      if (imageFile) {
        const filePath = `posts/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }
      
      if (!imageUrl && !post) {
         toast({ variant: 'destructive', title: 'Error', description: 'Gambar sampul wajib diisi.' });
         setIsSubmitting(false);
         return;
      }

      const slug = values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const postData = {
        user_id: user.id,
        title: values.title,
        slug,
        excerpt: values.excerpt,
        content: values.content,
        tags: values.tags.split(',').map(tag => tag.trim().toLowerCase()),
        image_url: imageUrl,
        author: values.author,
        author_image_url: post?.author_image_url || `https://placehold.co/100x100.png`,
      };

      if (post) {
        const { error } = await supabase.from('posts').update({ ...postData, updated_at: new Date().toISOString() }).match({ id: post.id });
        if (error) throw error;
        toast({
          title: 'Postingan Diperbarui',
          description: `Judul: ${values.title}`,
        });
      } else {
        const { error } = await supabase.from('posts').insert(postData);
        if (error) throw error;
        toast({
          title: 'Postingan Dibuat',
          description: `Judul: ${values.title}`,
        });
      }
      
      router.push('/admin/dashboard');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving post: ", error);
      toast({
        variant: 'destructive',
        title: 'Gagal Menyimpan',
        description: error.message || 'Terjadi kesalahan saat menyimpan postingan.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Judul Postingan</FormLabel>
              <FormControl>
                <Input placeholder="Judul yang menarik..." {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Nama Penulis</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>Nama ini akan ditampilkan sebagai penulis artikel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
                <FormLabel className="text-lg">Gambar Sampul</FormLabel>
                <FormControl>
                    <Input 
                      type="file"
                      accept="image/*"
                      {...imageRef}
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                    />
                </FormControl>
                {imagePreview && (
                    <div className="mt-4 relative w-full max-w-sm h-48">
                        <Image src={imagePreview} alt="Pratinjau gambar" fill className="object-contain rounded-md border" />
                    </div>
                )}
                <FormDescription>
                    {post ? "Unggah gambar baru untuk mengganti yang lama." : "Pilih gambar sampul untuk postingan Anda."}
                </FormDescription>
                <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Kutipan Singkat</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ringkasan singkat dari postingan Anda..."
                  className="resize-none"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Akan ditampilkan di halaman utama (maksimal 200 karakter).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Konten Lengkap (Markdown)</FormLabel>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Tulis</TabsTrigger>
                  <TabsTrigger value="preview">Pratinjau</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <FormControl>
                    <Textarea
                      placeholder="Tulis cerita lengkap Anda di sini menggunakan format Markdown..."
                      className="min-h-[300px] font-mono"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Gunakan sintaks Markdown. Pratinjau akan ditampilkan di tab sebelahnya.
                  </FormDescription>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="prose dark:prose-invert min-h-[300px] w-full max-w-none rounded-md border p-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentValue || "Pratinjau akan muncul di sini..."}</ReactMarkdown>
                  </div>
                </TabsContent>
              </Tabs>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Tags</FormLabel>
              <FormControl>
                <Input placeholder="pertanian, edukasi, sosial" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormDescription>
                Pisahkan setiap tag dengan koma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? 'Simpan Perubahan' : 'Publikasikan Postingan'}
        </Button>
      </form>
    </Form>
  );
}
