
export interface Post {
  id: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  user_id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  image_url: string;
  image_hint?: string;
  author: string;
  date: string; // Formatted date string for display
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  major: string;
  role: string;
  imageUrl: string;
  imageHint?: string;
}

export interface DPL {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
}
