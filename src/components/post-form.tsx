
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
import { db, storage, auth } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const postSchema = z.object({
  title: z.string().min(5, { message: 'Judul minimal 5 karakter.' }),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.imageUrl || null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      tags: post?.tags.join(', ') || '',
    },
  });
  
  const imageRef = form.register("image");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: PostFormValues) {
    setIsSubmitting(true);
    const currentUser = auth.currentUser;
    if (!currentUser) {
        toast({ variant: 'destructive', title: 'Error', description: 'Anda harus login untuk membuat postingan.' });
        setIsSubmitting(false);
        return;
    }

    try {
      let imageUrl = post?.imageUrl || '';
      const imageFile = values.image?.[0];

      if (imageFile) {
        const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      if (!imageUrl && !post) {
         toast({ variant: 'destructive', title: 'Error', description: 'Gambar sampul wajib diisi.' });
         setIsSubmitting(false);
         return;
      }

      const slug = values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const postData = {
        title: values.title,
        slug,
        excerpt: values.excerpt,
        content: values.content,
        tags: values.tags.split(',').map(tag => tag.trim()),
        imageUrl,
        author: currentUser.displayName || 'Admin',
        authorImageUrl: currentUser.photoURL || `https://placehold.co/100x100.png`,
        createdAt: post ? (post.date as any) : serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (post) {
        await setDoc(doc(db, 'posts', post.id), postData, { merge: true });
        toast({
          title: 'Postingan Diperbarui',
          description: `Judul: ${values.title}`,
        });
      } else {
        await addDoc(collection(db, 'posts'), postData);
        toast({
          title: 'Postingan Dibuat',
          description: `Judul: ${values.title}`,
        });
      }
      
      router.push('/admin/dashboard');

    } catch (error) {
      console.error("Error saving post: ", error);
      toast({
        variant: 'destructive',
        title: 'Gagal Menyimpan',
        description: 'Terjadi kesalahan saat menyimpan postingan.',
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
              <FormLabel className="text-lg">Konten Lengkap</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tulis cerita lengkap Anda di sini... Anda bisa menggunakan tag HTML sederhana seperti <h2> atau <p>."
                  className="min-h-[250px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
               <FormDescription>
                Konten lengkap yang akan ditampilkan di halaman detail postingan.
              </FormDescription>
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
