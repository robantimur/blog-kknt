
import PostCard from '@/components/post-card';
import { notFound } from 'next/navigation';
import { Tag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { Post } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type TagPageProps = {
  params: {
    tag: string;
  };
};

async function getPostsByTag(tag: string) {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .contains('tags', [tag])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
  
  return posts.map(post => {
    return {
      ...post,
      date: format(new Date(post.created_at), 'd LLLL yyyy', { locale: id }),
    } as Post;
  });
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: posts, error } = await supabase.from('posts').select('tags');

  if (error) {
    return [];
  }

  const allTags = new Set(posts.flatMap((post) => post.tags || []));
  return Array.from(allTags).map((tag) => ({
    tag: tag as string,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const filteredPosts = await getPostsByTag(tag);

  if (filteredPosts.length === 0) {
    // We don't call notFound() here because a tag might exist but have no posts temporarily.
    // Instead, we show a message.
  }
  
  const tagName = tag.replace(/-/g, ' ');

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline capitalize flex items-center justify-center gap-3">
          <Tag className="w-10 h-10 text-primary" />
          <span>{tagName}</span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {filteredPosts.length} postingan ditemukan dengan tag &quot;{tagName}&quot;
        </p>
      </section>

      <section>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-8">Tidak ada postingan yang ditemukan untuk tag ini.</p>
        )}
      </section>
    </div>
  );
}
