import type { Post, TeamMember, DPL } from './types';

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

export const posts: Post[] = [
  {
    id: '1',
    slug: 'penyuluhan-pertanian-modern',
    title: 'Penyuluhan Pertanian Modern di Desa Sukamaju',
    excerpt: 'Kami mengadakan penyuluhan tentang teknik pertanian modern untuk meningkatkan hasil panen warga desa.',
    content: '<h2>Meningkatkan Hasil Panen Melalui Teknologi</h2><p>Pada tanggal 15 Juli 2024, tim KKN kami menyelenggarakan sebuah acara penyuluhan yang berfokus pada penerapan teknik pertanian modern di balai desa Sukamaju. Acara ini dihadiri oleh lebih dari 50 petani dari berbagai kelompok tani. Kami memperkenalkan konsep seperti irigasi tetes, penggunaan pupuk organik cair, dan pengendalian hama terpadu. Antusiasme warga sangat tinggi, terutama saat sesi demonstrasi alat dan tanya jawab.</p><p>Kami berharap, dengan pengetahuan baru ini, para petani di Desa Sukamaju dapat meningkatkan produktivitas lahan mereka secara signifikan, yang pada akhirnya akan berdampak pada peningkatan kesejahteraan ekonomi mereka. Program ini akan terus kami pantau selama periode KKN berlangsung.</p>',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'agriculture counseling',
    author: 'Citra Lestari',
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '16 Juli 2024',
    tags: ['pertanian', 'edukasi', 'teknologi'],
  },
  {
    id: '2',
    slug: 'pelatihan-umkm-digital',
    title: 'Pelatihan UMKM Digital untuk Ibu-Ibu PKK',
    excerpt: 'Memberdayakan ekonomi lokal melalui pelatihan pemasaran digital bagi para pelaku UMKM di desa.',
    content: '<h3>Go Digital, Go Global</h3><p>Salah satu program utama kami adalah pemberdayaan ekonomi lokal. Kami mengadakan pelatihan intensif selama dua hari bagi ibu-ibu PKK yang memiliki usaha mikro, kecil, dan menengah (UMKM). Materi yang kami sampaikan mencakup dasar-dasar fotografi produk menggunakan smartphone, penulisan caption yang menarik, hingga pemanfaatan media sosial dan marketplace untuk penjualan.</p><p>Hasilnya luar biasa, banyak produk lokal seperti keripik singkong dan kerajinan tangan yang kini memiliki kemasan dan foto yang lebih menarik. Beberapa bahkan sudah mulai menerima pesanan dari luar kota. Ini adalah langkah awal yang menjanjikan untuk kemandirian ekonomi warga.</p>',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'digital workshop',
    author: 'Eko Prasetyo',
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '20 Juli 2024',
    tags: ['umkm', 'ekonomi', 'digital'],
  },
  {
    id: '3',
    slug: 'kerja-bakti-bersih-desa',
    title: 'Kerja Bakti dan Program Kali Bersih',
    excerpt: 'Semangat gotong royong dalam kegiatan kerja bakti membersihkan lingkungan desa dan area sungai.',
    content: '<h4>Lingkungan Bersih, Warga Sehat</h4><p>Kebersihan adalah pangkal kesehatan. Berangkat dari pepatah tersebut, kami menginisiasi program kerja bakti massal yang melibatkan seluruh elemen masyarakat, mulai dari anak-anak sekolah dasar hingga para orang tua. Fokus utama kami adalah membersihkan saluran air, jalanan desa, dan area sekitar sungai yang mulai dipenuhi sampah.</p><p>Kami juga memasang beberapa tempat sampah terpilah di titik-titik strategis dan memberikan edukasi singkat tentang pentingnya membuang sampah pada tempatnya dan memilah sampah organik dan anorganik. Semangat gotong royong warga sangat terasa dan kami berhasil mengumpulkan puluhan karung sampah. Lingkungan desa kini terlihat lebih asri dan bersih.</p>',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'community service',
    author: 'Budi Santoso',
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '22 Juli 2024',
    tags: ['lingkungan', 'sosial', 'gotong-royong'],
  },
   {
    id: '4',
    slug: 'pendidikan-anak-usia-dini',
    title: 'Mengajar dan Bermain di PAUD Ceria',
    excerpt: 'Membagikan keceriaan dan ilmu pengetahuan kepada anak-anak di Pendidikan Anak Usia Dini (PAUD) desa.',
    content: '<h5>Membangun Generasi Emas</h5><p>Setiap pagi, sebagian dari tim kami rutin mengunjungi PAUD Ceria untuk membantu para guru mengajar. Kami menggunakan metode belajar sambil bermain, seperti menyanyi, menggambar, dan bercerita, untuk membuat proses belajar menjadi menyenangkan. Kami juga memperkenalkan lagu-lagu tentang kebersihan dan cinta tanah air.</p><p>Melihat tawa dan semangat anak-anak adalah sumber energi bagi kami. Kami percaya bahwa investasi pada pendidikan anak usia dini adalah kunci untuk membangun generasi masa depan yang cerdas dan berkarakter. Kami juga menyumbangkan beberapa buku cerita dan alat permainan edukatif untuk melengkapi fasilitas PAUD.</p>',
    imageUrl: 'https://placehold.co/800x600.png',
    imageHint: 'children education',
    author: 'Dewi Anggraini',
    authorImageUrl: 'https://placehold.co/100x100.png',
    date: '25 Juli 2024',
    tags: ['pendidikan', 'anak', 'sosial'],
  }
];
