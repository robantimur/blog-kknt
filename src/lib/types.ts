
export interface Post {
  id: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  user_id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_hint?: string;
  author: string;
  author_image_url: string;
  date: string; // Formatted date string for display
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
