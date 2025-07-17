
'use client';

import PostForm from '@/components/post-form';
import { notFound, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Post } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function EditPostPage() {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const supabase = createClient();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast({
          variant: 'destructive',
          title: 'Gagal Memuat Postingan',
          description: "Postingan tidak ditemukan atau terjadi kesalahan.",
        });
        notFound();
      } else {
        setPost(data as Post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, supabase, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-4">Memuat data postingan...</span>
      </div>
    );
  }

  if (!post) {
     return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dasbor
          </Link>
        </Button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Edit Postingan</h1>
        <p className="mt-2 text-muted-foreground">Perbarui informasi pada postingan Anda.</p>
      </div>
      <div className="bg-card p-4 sm:p-8 rounded-xl shadow-md">
        <PostForm post={post} />
      </div>
    </div>
  );
}
