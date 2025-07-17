export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint?: string;
  author: string;
  authorImageUrl: string;
  date: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  major: string;
  imageUrl: string;
  imageHint?: string;
}

export interface DPL {
  name: string;
  title: string;
  imageUrl: string;
  imageHint?: string;
}
