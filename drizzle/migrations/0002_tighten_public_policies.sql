-- site_settings: mark which settings are publicly visible instead of exposing every row
alter table public.site_settings
  add column if not exists is_public boolean not null default true;

drop policy if exists "Settings are public" on public.site_settings;

create policy "Public settings are readable"
on public.site_settings
for select
to anon, authenticated
using (is_public = true);

-- inquiries: validate submissions instead of accepting any row
drop policy if exists "Anyone can submit an inquiry" on public.inquiries;

create policy "Anyone can submit a valid inquiry"
on public.inquiries
for insert
to anon, authenticated
with check (
  status = 'new'
  and length(btrim(name)) between 2 and 120
  and length(btrim(message)) between 5 and 5000
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(email) <= 254
  and (company is null or length(company) <= 160)
  and (phone is null or length(phone) <= 40)
  and (location is null or length(location) <= 160)
  and (product is null or length(product) <= 160)
);