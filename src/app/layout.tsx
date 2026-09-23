import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/ui/Header';
export const metadata:Metadata={title:{default:'tiasa.id | Jasa harian dan teknis',template:'%s | tiasa.id'},description:'Pesan layanan antar barang, kebersihan, kelistrikan, dan instalasi CCTV dengan estimasi biaya yang jelas.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body className="min-h-screen font-sans antialiased"><Header/>{children}<footer className="mt-20 border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-600">© {new Date().getFullYear()} tiasa.id · Layanan sesuai konfirmasi operasional</footer></body></html>}
