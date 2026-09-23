create extension if not exists pgcrypto;
create table public.bookings (
 id uuid primary key default gen_random_uuid(),
 reference text not null unique,
 name text not null check (char_length(name) between 2 and 100),
 phone text not null,
 service text not null check(service in ('antar-barang','bersih-bersih','listrik','cctv')),
 quantity integer not null check(quantity between 1 and 100),
 address text not null,
 requested_date date not null,
 requested_time time not null,
 details text not null,
 estimate_idr integer not null check(estimate_idr >= 0),
 status text not null default 'baru' check(status in ('baru','dikonfirmasi','selesai','dibatalkan')),
 created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
-- No public policies: only trusted server code with service role may write/read bookings.
revoke all on public.bookings from anon, authenticated;
create table public.booking_rate_limits (request_hash text not null, bucket timestamptz not null, count integer not null default 1, primary key(request_hash,bucket));
alter table public.booking_rate_limits enable row level security;
revoke all on public.booking_rate_limits from anon, authenticated;
create or replace function public.allow_booking(request_hash text) returns boolean language plpgsql security definer set search_path = '' as $$
declare slot timestamptz := date_trunc('hour', now()); current_count integer;
begin
 if request_hash !~ '^[a-f0-9]{64}$' then return false; end if;
 insert into public.booking_rate_limits(request_hash,bucket,count) values(request_hash,slot,1)
 on conflict (request_hash,bucket) do update set count=public.booking_rate_limits.count+1 returning count into current_count;
 return current_count <= 5;
end $$;
revoke all on function public.allow_booking(text) from public, anon, authenticated;
grant execute on function public.allow_booking(text) to service_role;
