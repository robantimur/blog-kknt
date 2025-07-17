
import type { Timestamp } from 'firebase/firestore';

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
  // Use string for form and client-side, but Timestamp for Firestore
  date: string | Timestamp; 
  tags: string[];
  createdAt: Timestamp;
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
