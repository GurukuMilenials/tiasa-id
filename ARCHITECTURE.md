# Architecture & Technical Spec - tiasa.id

## 1. Tech Stack
* **Framework**: Next.js (App Router, TypeScript)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Form & Validation**: React Hook Form + Zod
* **Deployment**: Vercel

## 2. Struktur Folder
tiasa-id/
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── layanan/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── pesan/
│   │   │   └── page.tsx
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── sections/
│   │   └── forms/
│   ├── config/
│   │   └── services.ts
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── PRD.md
├── DESIGN_SYSTEM.md
├── ARCHITECTURE.md
└── AGENTS.md

## 3. Alur Data Pesanan
1. Pengguna memilih kategori layanan pada antarmuka.
2. Pengguna mengisi rincian kebutuhan pada form pemesanan (`src/components/forms/BookingForm.tsx`).
3. Data divalidasi menggunakan skema Zod di sisi klien.
4. Data terformat diproses dan dikonversi menjadi URL WhatsApp API terstruktur untuk dikirimkan ke nomor tim operasional tiasa.id.