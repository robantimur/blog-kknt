import type { Post, TeamMember, DPL } from "./types";

// This file is now primarily for static data like team members.
// Post data is fetched from Firebase Firestore.

export const dpls: DPL[] = [
  {
    name: "Dr. Ir. Ita Widowati, DEA",
    title: "Dosen Pembimbing Lapangan 1",
    imageUrl:
      "https://kelautan.fpik.undip.ac.id/wp-content/uploads/2024/08/Ita-Widowati.jpg",
    imageHint: "Dr. Ir. Ita Widowati, DEA",
  },
  {
    name: "dr. Rizky Rahmayanti, Sp.PD",
    title: "Dosen Pembimbing Lapangan 2",
    imageUrl:
      "https://dk4fkkwa4o9l0.cloudfront.net/production/uploads/doctor/avatar/3202/ia__31_.png",
    imageHint: "dr. Rizky Rahmayanti, Sp.PD",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Tiara Risma Faza",
    major: "Psikologi",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "2",
    name: "Shafa Rasendriya Nasta",
    major: "Ilmu Perpustakaan dan Informasi",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "3",
    name: "Akbar Ramadhan Putra Awwala",
    major: "Teknologi Rekayasa Konstruksi Perkapalan",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "4",
    name: "Muhammad Fuad Fakhruzzaki",
    major: "Teknik Komputer",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "5",
    name: "Annisa Nurrizqy Yudenita",
    major: "Teknologi Hasil Perikanan",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "6",
    name: "Nurul Amirah",
    major: "Kedokteran Gigi",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "7",
    name: "Rezqilla Ashya",
    major: "Informasi dan Hubungan Masyarakat",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "8",
    name: "Gema Rigel Nursyabana Wangi",
    major: "Teknik Geologi",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
  {
    id: "9",
    name: "Victoria Daniel Herdiyanto",
    major: "Manajemen",
    imageUrl: "https://placehold.co/400x400.png",
    imageHint: "student portrait",
  },
];

export const posts: Post[] = []; // This is now an empty array. Data comes from Firestore.
