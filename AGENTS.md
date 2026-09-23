# Guidelines & Coding Rules - tiasa.id

## 1. Standar Kode & TypeScript
* Gunakan mode TypeScript ketat (`strict: true`). Hindari penggunaan tipe `any`.
* Prioritaskan penggunaan React Server Components (RSC). Gunakan directive `'use client'` hanya pada komponen yang membutuhkan state interaktif atau penanganan event.
* Gunakan Tailwind CSS murni untuk pengkodean antarmuka. Jangan menambah berkas CSS kustom di luar `globals.css`.

## 2. Konvensi Penamaan
* **Berkas Komponen**: Menggunakan pola `PascalCase` (contoh: `ServiceCard.tsx`, `BookingForm.tsx`).
* **Variabel & Fungsi**: Menggunakan pola `camelCase` (contoh: `calculatePrice`, `isAvailable`).
* **Tipe Data**: Menggunakan pola `PascalCase` (contoh: `ServiceDetail`, `OrderPayload`).

## 3. Konsistensi Antarmuka
* Selalu gunakan nilai warna, jarak, dan gaya komponen yang sudah dispesifikasikan di `DESIGN_SYSTEM.md`.
* Pisahkan komponen generik yang dapat digunakan kembali ke dalam folder `src/components/ui/`.

## 4. Penanganan Formulir
* Semua masukan pengguna wajib dibungkus menggunakan `react-hook-form` dan skema validasi `zod`.