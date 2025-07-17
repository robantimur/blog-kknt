
import type { Post, TeamMember, DPL } from './types';

// This file is now primarily for static data like team members.
// Post data is fetched from Firebase Firestore.

export const dpl: DPL = {
  name: 'Dr. John Doe, M.Kom.',
  title: 'Dosen Pembimbing Lapangan',
  imageUrl: 'https://placehold.co/400x400.png',
  imageHint: 'lecturer portrait'
};

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Ahmad Subarjo', major: 'Teknik Informatika', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'student portrait' },
  { id: '2', name: 'Budi Santoso', major: 'Sistem Informasi', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'student portrait' },
  { id: '3', name: 'Citra Lestari', major: 'Desain Komunikasi Visual', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'female student' },
  { id: '4', name: 'Dewi Anggraini', major: 'Ilmu Komunikasi', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'female portrait' },
  { id: '5', name: 'Eko Prasetyo', major: 'Manajemen', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'male student' },
  { id: '6', name: 'Fitriani', major: 'Agribisnis', imageUrl: 'https://placehold.co/400x400.png', imageHint: 'student headshot' },
];

export const posts: Post[] = []; // This is now an empty array. Data comes from Firestore.
