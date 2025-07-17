import PostForm from '@/components/post-form';

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Buat Postingan Baru</h1>
        <p className="mt-2 text-muted-foreground">Bagikan cerita dan kegiatan terbaru dari KKN Anda.</p>
      </div>
      <div className="bg-card p-8 rounded-xl shadow-md">
        <PostForm />
      </div>
    </div>
  );
}
