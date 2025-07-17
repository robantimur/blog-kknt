import { posts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, User } from 'lucide-react';

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

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
            <time dateTime={post.date}>{post.date}</time>
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
                <Link key={tag} href={`/tags/${tag}`} legacyBehavior>
                    <a className="block">
                        <Badge variant="default" className="capitalize transition-colors hover:bg-primary/80">
                            {tag.replace(/-/g, ' ')}
                        </Badge>
                    </a>
                </Link>
            ))}
          </div>
      </footer>
    </article>
  );
}
