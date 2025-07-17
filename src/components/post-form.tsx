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

const postSchema = z.object({
  title: z.string().min(5, { message: 'Judul minimal 5 karakter.' }),
  excerpt: z.string().min(10, { message: 'Kutipan minimal 10 karakter.' }).max(200, { message: 'Kutipan maksimal 200 karakter.' }),
  imageUrl: z.string().url({ message: 'URL gambar tidak valid.' }),
  content: z.string().min(50, { message: 'Konten minimal 50 karakter.' }),
  tags: z.string().min(1, { message: 'Harus ada minimal satu tag.' }),
});

type PostFormProps = {
  post?: Post;
};

export default function PostForm({ post }: PostFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      imageUrl: post?.imageUrl || '',
      content: post?.content || '',
      tags: post?.tags.join(', ') || '',
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    // This is where the logic to save the post would go (e.g., a server action).
    console.log(values);
    toast({
      title: `Postingan ${post ? 'Diperbarui' : 'Dibuat'} (Simulasi)`,
      description: `Judul: ${values.title}`,
    });
    // In a real app, you would redirect to the dashboard after success.
    router.push('/admin/dashboard');
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
                <Input placeholder="Judul yang menarik..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">URL Gambar Sampul</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/800x600.png" {...field} />
              </FormControl>
              <FormDescription>
                Gunakan URL gambar yang valid.
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
                <Input placeholder="pertanian, edukasi, sosial" {...field} />
              </FormControl>
              <FormDescription>
                Pisahkan setiap tag dengan koma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">
          {post ? 'Simpan Perubahan' : 'Publikasikan Postingan'}
        </Button>
      </form>
    </Form>
  );
}
