
import PostCard from '@/components/post-card';
import { notFound } from 'next/navigation';
import { Tag } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Post } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type TagPageProps = {
  params: {
    tag: string;
  };
};

async function getPostsByTag(tag: string) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  const posts = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: format(data.createdAt.toDate(), 'd LLLL yyyy', { locale: id }),
    } as Post;
  });
  
  return posts;
}

export async function generateStaticParams() {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  const allTags = new Set(postSnapshot.docs.flatMap((doc) => doc.data().tags || []));
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
