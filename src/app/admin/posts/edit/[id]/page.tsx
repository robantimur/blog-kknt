
'use client';

import PostForm from '@/components/post-form';
import { notFound, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { Post } from '@/lib/types';
import { Loader2 } from 'lucide-react';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", params.id));
        if (postDoc.exists()) {
          const data = postDoc.data();
          setPost({ id: postDoc.id, ...data } as Post);
        } else {
          setError("Postingan tidak ditemukan.");
          notFound();
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat postingan.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return <div className="text-center text-destructive">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Edit Postingan</h1>
        <p className="mt-2 text-muted-foreground">Perbarui informasi pada postingan Anda.</p>
      </div>
      <div className="bg-card p-8 rounded-xl shadow-md">
        {post && <PostForm post={post} />}
      </div>
    </div>
  );
}
