
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dpls, teamMembers } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Tentang Kami</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Mengenal lebih dekat Kelompok 5 Tim 1 dan program kerja KKN Tematik kami.
        </p>
      </section>

      <section>
        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Tema KKN Tematik</CardTitle>
            <CardDescription>Implementasi Program Pengabdian Kepada Masyarakat IDBU (Iptek Bagi Daerah Binaan UNDIP)</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg md:text-xl font-bold mb-2">
              &quot;Dari Limbah Menjadi Berkah: Penguatan Ekonomi Sirkular di Desa Roban Barat Kabupaten Batang Melalui Produksi Kekerangan di Pesisir Utara Jawa Tengah&quot;
            </h3>
            <p className="mt-4 text-muted-foreground">
              Kegiatan KKN Tematik ini merupakan bagian dari implementasi program pengabdian masyarakat skema IDBU (Iptek Bagi Daerah Binaan UNDIP). Program ini dirancang untuk mendukung penguatan ekonomi sirkular di Desa Roban Barat, Kabupaten Batang, dengan memanfaatkan potensi besar produksi kekerangan.
            </p>
            <p className="mt-2 text-muted-foreground">
              Melalui program ini, mahasiswa berperan aktif mendampingi masyarakat dalam proses pemberdayaan berbasis potensi lokal untuk mengolah limbah kekerangan menjadi produk bernilai tambah seperti pupuk organik, pakan ternak, atau kerajinan. Tujuannya adalah untuk meningkatkan kesejahteraan ekonomi sekaligus menjaga keberlanjutan lingkungan.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Dosen Pembimbing Lapangan</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {dpls.map((dpl) => (
            <Card key={dpl.name} className="w-full max-w-md text-center flex flex-col">
              <CardHeader className="flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                      <AvatarImage src={dpl.imageUrl} alt={dpl.name} data-ai-hint={dpl.imageHint} className="object-contain" />
                      <AvatarFallback>{dpl.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-bold font-headline">{dpl.name}</CardTitle>
                    <p className="text-muted-foreground">{dpl.title}</p>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-center">
                <p className="text-sm text-center italic text-muted-foreground/80">
                  &quot;{dpl.description}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Anggota Tim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} className="object-contain"/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold font-headline">{member.name}</h3>
                <p className="text-primary font-medium text-sm">{member.role}</p>
                <p className="text-muted-foreground text-sm mt-1">{member.major}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
