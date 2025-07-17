
import PostForm from '@/components/post-form';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Post } from '@/lib/types';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const supabase = createClient();
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Edit Postingan</h1>
        <p className="mt-2 text-muted-foreground">Perbarui informasi pada postingan Anda.</p>
      </div>
      <div className="bg-card p-4 sm:p-8 rounded-xl shadow-md">
        <PostForm post={post as Post} />
      </div>
    </div>
  );
}
