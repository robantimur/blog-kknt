
import { createClient } from '@/lib/supabase/server';
import type { Post } from '@/lib/types';
import PostCard from '@/components/post-card';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

async function getPosts() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);
    
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return posts.map(post => ({
    ...post,
    date: format(new Date(post.created_at), 'd LLLL yyyy', { locale: id }),
  })) as Post[];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-12">
      <section className="text-center bg-primary text-primary-foreground -mx-4 sm:-mx-6 lg:-mx-8 py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Selamat Datang di KKN Connect</h1>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Jelajahi kegiatan dan cerita dari KKN Kelompok 5 Tim 1.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Postingan Terbaru</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Belum ada postingan.</p>
        )}
      </section>
    </div>
  );
}
