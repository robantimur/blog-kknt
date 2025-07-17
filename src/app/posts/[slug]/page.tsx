
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Post } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type PostPageProps = {
  params: {
    slug: string;
  };
};

async function getPostBySlug(slug: string): Promise<Post | null> {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        date: format(data.createdAt.toDate(), 'd LLLL yyyy', { locale: id }),
    } as Post;
}

export async function generateStaticParams() {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  return postSnapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postDate = typeof post.date === 'string' ? post.date : format(post.date.toDate(), 'd LLLL yyyy', { locale: id });
  const dateTime = typeof post.date === 'string' ? new Date(post.date).toISOString() : post.date.toDate().toISOString();


  return (
    <article className="max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorImageUrl} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={dateTime}>{postDate}</time>
          </div>
        </div>
      </header>

      <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={post.imageHint} />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none [&>h2]:font-headline [&>h3]:font-headline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} passHref>
                <Badge variant="default" className="capitalize transition-colors hover:bg-primary/80 cursor-pointer">
                  {tag.replace(/-/g, ' ')}
                </Badge>
              </Link>
            ))}
          </div>
      </footer>
    </article>
  );
}
