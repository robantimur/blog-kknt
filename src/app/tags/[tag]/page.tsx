import { posts } from '@/lib/data';
import PostCard from '@/components/post-card';
import { notFound } from 'next/navigation';
import { Tag } from 'lucide-react';

type TagPageProps = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams() {
  const allTags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(allTags).map((tag) => ({
    tag,
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));

  if (filteredPosts.length === 0) {
    notFound();
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
