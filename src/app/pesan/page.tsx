import { BookingForm } from '@/components/forms/BookingForm';
export const metadata={title:'Pesan layanan'};
export default function BookingPage(){return <main className="mx-auto max-w-3xl px-5 py-12"><h1 className="text-4xl font-bold">Pesan layanan</h1><p className="mt-3 text-slate-600">Isi kebutuhan Anda. Estimasi biaya dan ketersediaan jadwal akan dikonfirmasi oleh tim operasional.</p><BookingForm/></main>}
