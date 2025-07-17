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
          Mengenal lebih dekat Kelompok 5 Tim 1 dan program kerja KKN kami.
        </p>
      </section>

      <section>
        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Tema KKN</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              &quot;Pemberdayaan Masyarakat Desa Melalui Inovasi Digital dan Pertanian Berkelanjutan untuk Meningkatkan Kesejahteraan Ekonomi Lokal.&quot;
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Dosen Pembimbing Lapangan</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {dpls.map((dpl) => (
            <Card key={dpl.name} className="w-full max-w-sm text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary">
                  <AvatarImage src={dpl.imageUrl} alt={dpl.name} data-ai-hint={dpl.imageHint} />
                  <AvatarFallback>{dpl.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold font-headline">{dpl.name}</h3>
                <p className="text-muted-foreground">{dpl.title}</p>
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
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold font-headline">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.major}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
