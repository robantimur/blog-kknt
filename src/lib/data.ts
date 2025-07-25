import type { Post, TeamMember, DPL } from "./types";

// This file is now primarily for static data like team members.
// Post data is fetched from Firebase Firestore.

export const dpls: DPL[] = [
  {
    name: "Dr. Ir. Ita Widowati, DEA",
    title: "Ilmu Kelautan (FPIK)",
    description: "SDG 12 – Responsible Consumption and Production: Kajian dampak ekologis pemanfaatan limbah kerang, serta pelatihan konservasi lingkungan berbasis masyarakat pesisir.",
    imageUrl:
      "https://kelautan.fpik.undip.ac.id/wp-content/uploads/2024/08/Ita-Widowati.jpg",
    imageHint: "woman portrait",
  },
  {
    name: "dr. Rizky Rahmayanti, Sp.PD",
    title: "Studi Ilmu Penyakit Dalam (FK)",
    description: "SDG 3 – Good Health and Well-Being: Edukasi kesehatan lingkungan dan gizi masyarakat, serta deteksi dini penyakit yang mungkin terkait sanitasi dan limbah.",
    imageUrl:
      "https://dk4fkkwa4o9l0.cloudfront.net/production/uploads/doctor/avatar/3202/ia__31_.png",
    imageHint: "woman portrait",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "4",
    name: "Muhammad Fuad Fakhruzzaki",
    major: "Teknik Komputer",
    role: "Ketua",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Muhammad%20Fuad%20Fakhruzzaki_Kelompok%205.PNG",
    imageHint: "student portrait",
  },
  {
    id: "3",
    name: "Akbar Ramadhan Putra Awwala",
    major: "Teknologi Rekayasa Konstruksi Perkapalan",
    role: "Wakil Ketua",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Akbar%20Ramadhan_kelompok%205%20.jpg",
    imageHint: "student portrait",
  },
  {
    id: "9",
    name: "Victoria Daniel Herdiyanto",
    major: "Manajemen",
    role: "Sekretaris",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Victoria%20Daniel%20Herdiyanto_Kelompok%205.jpg",
    imageHint: "student portrait",
  },
  {
    id: "7",
    name: "Rezqilla Ashya",
    major: "Informasi dan Hubungan Masyarakat",
    role: "Sekretaris",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/rezqilla%20ashya.png",
    imageHint: "student portrait",
  },
  {
    id: "6",
    name: "Nurul Amirah",
    major: "Kedokteran Gigi",
    role: "Bendahara",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Nurul%20Amirah_Kelompok%205_.jpg",
    imageHint: "student portrait",
  },
  {
    id: "2",
    name: "Shafa Rasendriya Nasta",
    major: "Ilmu Perpustakaan dan Informasi",
    role: "Pubdok",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/shafa.png",
    imageHint: "student portrait",
  },
  {
    id: "5",
    name: "Annisa Nurrizqy Yudenita",
    major: "Teknologi Hasil Perikanan",
    role: "Pubdok",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/annisa.png",
    imageHint: "student portrait",
  },
  {
    id: "1",
    name: "Tiara Risma Faza",
    major: "Psikologi",
    role: "Humas",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Tiara%20Risma%20Faza_Kelompok%205.jpg",
    imageHint: "student portrait",
  },
  {
    id: "8",
    name: "Gema Rigel Nursyabana Wangi",
    major: "Teknik Geologi",
    role: "Perkap",
    imageUrl:
      "https://xoyfvbzzxnpvednkctur.supabase.co/storage/v1/object/public/posts/posts/Gema%20Rigel%20Nursyabana%20Wangi_Kelompok%205.jpg",
    imageHint: "student portrait",
  },
];


export const posts: Post[] = []; // This is now an empty array. Data comes from Firestore.
