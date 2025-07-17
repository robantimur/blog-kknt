
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={post.image_hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="text-xl font-bold font-headline leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
            <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag.replace(/-/g, ' ')}
              </Badge>
            ))}
          </div>
           <div className="flex items-center text-sm text-primary font-semibold">
            Baca Selengkapnya
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
