import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/static';

const URL = 'https://kkn-connect-prod.web.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  // 1. Get all posts for post-specific URLs
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('slug, updated_at');
    
  if (postsError) {
    console.error('Error fetching posts for sitemap:', postsError);
    return [];
  }

  const postUrls = posts?.map(({ slug, updated_at }) => ({
    url: `${URL}/posts/${slug}`,
    lastModified: new Date(updated_at).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })) ?? [];


  // 2. Get all tags for tag-specific URLs
  const { data: tagsData, error: tagsError } = await supabase
    .from('posts')
    .select('tags');

  if (tagsError) {
    console.error('Error fetching tags for sitemap:', tagsError);
    return [];
  }

  const allTags = new Set(tagsData?.flatMap((post) => post.tags || []) ?? []);
  const tagUrls = Array.from(allTags).map((tag) => ({
    url: `${URL}/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. Add static pages
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [
    ...staticUrls,
    ...postUrls,
    ...tagUrls,
  ];
}
