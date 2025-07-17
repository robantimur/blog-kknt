import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Roban Berkarya',
  description: 'Website KKN Tematik Tim 1 Kelompok 5 di Desa Roban Barat.',
  icons: {
    icon: '/favicon.ico', // Ganti dengan path favicon baru jika berbeda
    // Opsi tambahan:
    // icon: '/favicon.png',
    // icon: '/favicon.svg',
    // apple: '/apple-icon.png', // untuk iOS
    // shortcut: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
