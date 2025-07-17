import PostForm from '@/components/post-form';
import { posts } from '@/lib/data';
import { notFound } from 'next/navigation';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Edit Postingan</h1>
        <p className="mt-2 text-muted-foreground">Perbarui informasi pada postingan Anda.</p>
      </div>
      <div className="bg-card p-8 rounded-xl shadow-md">
        <PostForm post={post} />
      </div>
    </div>
  );
}
