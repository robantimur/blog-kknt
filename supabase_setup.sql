-- 1. Skrip Pembuatan Tabel 'posts'
-- Tabel ini akan menyimpan semua data postingan blog Anda.

CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  excerpt text NULL,
  content text NULL,
  image_url text NULL,
  image_hint text NULL,
  author text NULL,
  author_image_url text NULL,
  tags text[] NULL,
  CONSTRAINT posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_slug_key UNIQUE (slug),
  CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Memberikan hak akses ke peran anon dan authenticated
ALTER TABLE public.posts OWNER TO postgres;
GRANT ALL ON TABLE public.posts TO postgres;
GRANT ALL ON TABLE public.posts TO service_role;
GRANT SELECT ON TABLE public.posts TO anon;
GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.posts TO authenticated;


-- 2. Kebijakan Keamanan (Row Level Security) untuk Tabel 'posts'
-- Ini akan memastikan data Anda aman.

-- Mengaktifkan Row Level Security pada tabel posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Izinkan akses baca (SELECT) untuk semua orang (publik)
CREATE POLICY "Public posts are viewable by everyone."
ON public.posts FOR SELECT
USING (true);

-- Policy 2: Izinkan pengguna yang terautentikasi untuk menyisipkan (INSERT) postingan mereka sendiri
CREATE POLICY "Users can insert their own posts."
ON public.posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Izinkan pengguna untuk memperbarui (UPDATE) postingan mereka sendiri
CREATE POLICY "Users can update their own posts."
ON public.posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Izinkan pengguna untuk menghapus (DELETE) postingan mereka sendiri
CREATE POLICY "Users can delete their own posts."
ON public.posts FOR DELETE
USING (auth.uid() = user_id);


-- 3. Penyiapan Supabase Storage
-- Bucket ini akan digunakan untuk menyimpan gambar postingan.

-- Membuat bucket bernama 'posts' dan menjadikannya publik
INSERT INTO storage.buckets (id, name, public)
VALUES ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;

-- Policy 1: Izinkan semua orang untuk melihat (SELECT) gambar di bucket 'posts'
CREATE POLICY "Post images are publicly accessible."
ON storage.objects FOR SELECT
USING (bucket_id = 'posts');

-- Policy 2: Izinkan pengguna yang terautentikasi untuk mengunggah (INSERT) gambar
CREATE POLICY "Anyone authenticated can upload an image."
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'posts' AND auth.role() = 'authenticated');

-- Policy 3: Izinkan pengguna yang terautentikasi untuk memperbarui (UPDATE) gambar
CREATE POLICY "Anyone authenticated can update an image."
ON storage.objects FOR UPDATE
WITH CHECK (bucket_id = 'posts' AND auth.role() = 'authenticated');

-- Policy 4: Izinkan pengguna yang terautentikasi untuk menghapus (DELETE) gambar
CREATE POLICY "Anyone authenticated can delete an image."
ON storage.objects FOR DELETE
USING (bucket_id = 'posts' AND auth.role() = 'authenticated');
