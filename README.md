# tiasa.id

Next.js App Router, TypeScript strict, Tailwind CSS, React Hook Form + Zod, Supabase PostgreSQL. Siap untuk Vercel.

## Menjalankan

1. `npm install`
2. Salin `.env.example` menjadi `.env.local` dan isi seluruh variabel. Jangan menaruh service role key dalam variabel `NEXT_PUBLIC_*`.
3. Jalankan migrasi `supabase/migrations/20260923000000_initial.sql` di SQL Editor proyek Supabase.
4. `npm run dev`; verifikasi dengan `npm run typecheck` dan `npm run build`.
5. Impor repositori ke Vercel; atur variabel lingkungan sesuai `.env.example` pada Production/Preview lalu deploy. Gunakan domain `tiasa.id` dan set `NEXT_PUBLIC_SITE_URL` sesuai domain aktif.

## Keamanan dan operasional

Pesanan ditulis hanya oleh API server dengan service role key. RLS aktif dan tidak ada policy publik untuk tabel pesanan. Validasi dilakukan pada klien serta di server. API mengecek origin, content type, batas payload, tanggal, kuantitas, honeypot, dan membatasi 5 permintaan per IP per jam melalui fungsi SQL atomik. IP disimpan hanya sebagai HMAC; jangan bagikan `BOOKING_HASH_SECRET`. Untuk trafik tinggi atau serangan terdistribusi, aktifkan WAF/rate limiting tambahan di tepi jaringan. Data pesanan dapat dilihat di dashboard Supabase; berikan akses hanya kepada staf terkait. Tambahkan jadwal penghapusan data sesuai kebijakan privasi bisnis. Harga di `src/config/services.ts` adalah nilai contoh yang perlu disahkan sebelum melayani pelanggan. Nomor WhatsApp admin diisi tanpa tanda `+`. Galeri/testimoni akan ditampilkan setelah materi asli tersedia.
