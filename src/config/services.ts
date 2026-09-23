import { Package, Sparkles, Zap, Cctv } from 'lucide-react';
export const services = [
 {slug:'antar-barang',name:'Antar Barang',icon:Package,description:'Pengantaran barang untuk kebutuhan pribadi dan usaha.',scope:'Penjemputan dan pengantaran barang sesuai rute dan ukuran muatan.',unit:'km',unitLabel:'Jarak perjalanan (km)',base:20000,step:4500,min:1,max:100,details:['Jarak dan ukuran barang dikonfirmasi sebelum penjemputan','Barang berbahaya atau terlarang tidak dilayani']},
 {slug:'bersih-bersih',name:'Bersih-Bersih',icon:Sparkles,description:'Bantuan kebersihan rumah, kantor, atau area usaha.',scope:'Pembersihan area sesuai luas dan kondisi yang disepakati.',unit:'jam',unitLabel:'Durasi kerja (jam)',base:50000,step:40000,min:1,max:12,details:['Peralatan dan kebutuhan khusus dibahas saat konfirmasi','Biaya dapat berubah menurut luas dan kondisi area']},
 {slug:'listrik',name:'Perbaikan & Instalasi Listrik',icon:Zap,description:'Pemeriksaan, perbaikan, dan pemasangan kelistrikan.',scope:'Penanganan titik listrik oleh teknisi sesuai hasil pemeriksaan.',unit:'titik',unitLabel:'Jumlah titik',base:75000,step:65000,min:1,max:30,details:['Material dan suku cadang dihitung terpisah','Pekerjaan dimulai setelah kondisi lapangan diperiksa']},
 {slug:'cctv',name:'Instalasi CCTV',icon:Cctv,description:'Pemasangan kamera pengawas untuk rumah dan bisnis.',scope:'Pemasangan dan pengaturan kamera pada lokasi yang disepakati.',unit:'kamera',unitLabel:'Jumlah kamera',base:150000,step:125000,min:1,max:24,details:['Perangkat, kabel, dan penyimpanan dihitung terpisah','Survei menentukan jalur pemasangan yang aman']},
] as const;
export type ServiceSlug = typeof services[number]['slug'];
export function getService(slug:string){return services.find(s=>s.slug===slug);}
export function estimate(slug:string,quantity:number){const service=getService(slug);return service ? service.base+service.step*quantity : 0;}
export const rupiah=(value:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
