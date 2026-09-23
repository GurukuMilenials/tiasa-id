import { NextRequest,NextResponse } from 'next/server';
import { createHash,createHmac,randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from '@/lib/booking';
import { getService,estimate } from '@/config/services';
export const runtime='nodejs';
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');if(origin&&origin!==request.nextUrl.origin)return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return NextResponse.json({error:'Invalid content type'},{status:415});
 const length=Number(request.headers.get('content-length')||0);if(length>10000)return NextResponse.json({error:'Payload too large'},{status:413});
 let body:unknown;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 const parsed=bookingSchema.safeParse(body);if(!parsed.success||parsed.data.website)return NextResponse.json({error:'Invalid booking data'},{status:400});
 const data=parsed.data;const service=getService(data.service);if(!service||data.quantity>service.max)return NextResponse.json({error:'Invalid quantity'},{status:400});
 const day=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Jakarta'});if(data.date<day)return NextResponse.json({error:'Date must be today or later'},{status:400});
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,secret=process.env.BOOKING_HASH_SECRET;if(!url||!key||!secret)return NextResponse.json({error:'Booking is temporarily unavailable'},{status:503});
 const ip=request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';const ipHash=createHmac('sha256',secret).update(ip).digest('hex');
 const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:allowed,error:rateError}=await supabase.rpc('allow_booking',{request_hash:ipHash});if(rateError)return NextResponse.json({error:'Booking is temporarily unavailable'},{status:503});if(!allowed)return NextResponse.json({error:'Too many requests'},{status:429});
 const reference=`TS-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${randomBytes(3).toString('hex').toUpperCase()}`;
 const {error}=await supabase.from('bookings').insert({reference,name:data.name,phone:data.phone,service:data.service,quantity:data.quantity,address:data.address,requested_date:data.date,requested_time:data.time,details:data.details,estimate_idr:estimate(data.service,data.quantity)});if(error)return NextResponse.json({error:'Booking is temporarily unavailable'},{status:503});
 const admin=process.env.WHATSAPP_ADMIN_NUMBER?.replace(/\D/g,'');const text=`Halo tim tiasa.id, saya ingin konfirmasi pesanan ${reference}. Layanan: ${service.name}. Nama: ${data.name}. Tanggal: ${data.date} ${data.time} WIB.`;
 return NextResponse.json({reference,whatsappUrl:admin?`https://wa.me/${admin}?text=${encodeURIComponent(text)}`:undefined},{status:201,headers:{'Cache-Control':'no-store'}});
}
