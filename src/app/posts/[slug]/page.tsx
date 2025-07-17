import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { createClient as createStaticClient } from '@/lib/supabase/static';
import type { Post } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Metadata, ResolvingMetadata } from 'next';

type PostPageProps = {
  params: {
    slug: string;
  };
};

async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

  if (error || !data) {
      return null;
  }
  
  return {
      ...data,
      date: format(new Date(data.created_at), 'd LLLL yyyy', { locale: id }),
  } as Post;
}

// Function to generate dynamic metadata
export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Postingan Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak ada.',
    };
  }
  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post.title} | Roban Berkarya`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      images: [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
    },
  };
}

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: posts, error } = await supabase.from('posts').select('slug');
  
  if (error) {
    return [];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postDate = post.date as string;
  const dateTime = new Date(post.created_at).toISOString();


  return (
    <article className="max-w-4xl mx-auto bg-card p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4 break-words">{post.title}</h1>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={dateTime}>{postDate}</time>
          </div>
        </div>
      </header>

      {post.image_url && (
        <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden bg-muted">
          <Image src={post.image_url} alt={post.title} fill className="object-cover" data-ai-hint={post.image_hint} priority />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none break-words [&>h2]:font-headline [&>h3]:font-headline"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      
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
