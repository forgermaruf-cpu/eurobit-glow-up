-- Roles ---------------------------------------------------------------
create type public.app_role as enum ('admin', 'editor', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can read own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create policy "Admins manage roles"
on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Products ------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'Bitumen Membrane',
  tagline text not null default '',
  description text not null default '',
  specs jsonb not null default '[]'::jsonb,
  image_url text,
  image_alt text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;

create policy "Published products are public"
on public.products for select to anon, authenticated
using (published = true);

create policy "Admins read all products"
on public.products for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins write products"
on public.products for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Posts ---------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tag text not null default '',
  excerpt text not null default '',
  body text not null default '',
  cover_url text,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;

create policy "Published posts are public"
on public.posts for select to anon, authenticated
using (published = true);

create policy "Admins read all posts"
on public.posts for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins write posts"
on public.posts for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Site settings -------------------------------------------------------
create table public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;

create policy "Settings are public"
on public.site_settings for select to anon, authenticated
using (true);

create policy "Admins write settings"
on public.site_settings for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Inquiries -----------------------------------------------------------
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  location text,
  message text not null,
  product text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

grant insert on public.inquiries to anon;
grant select, insert, update, delete on public.inquiries to authenticated;
grant all on public.inquiries to service_role;
alter table public.inquiries enable row level security;

create policy "Anyone can submit an inquiry"
on public.inquiries for insert to anon, authenticated
with check (true);

create policy "Admins read inquiries"
on public.inquiries for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins update inquiries"
on public.inquiries for update to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete inquiries"
on public.inquiries for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Seed products -------------------------------------------------------
insert into public.products (slug, name, category, tagline, description, specs, image_url, image_alt, sort_order) values
('eurobit-4170','Eurobit 4170 (3170 / 5170)','Bitumen Membrane','APP-modified torch-on membrane for roofs and foundations.','Eurobit 4170 is our core torch-applied APP-modified bitumen membrane, reinforced with non-woven polyester and available in 3, 4 and 5 mm (3170 / 4170 / 5170). Used for roof slabs, foundations, basements and podium decks.','[{"label":"Thickness","value":"3 / 4 / 5 mm"},{"label":"Reinforcement","value":"Polyester"},{"label":"Softening Point","value":"≥ 150°C"},{"label":"Standard","value":"ASTM D6222"}]','/__l5e/assets-v1/8faa5b0a-f072-4417-83dd-78f82f0578d6/eurobit-membrane.jpg','Rolls of Eurobit 4170 APP-modified bitumen waterproofing membrane with black torch-on surface, red banding and printed eurobit branding.',10),
('eurobit-4170-sl','Eurobit 4170 SL','Bitumen Membrane','Slate-finish membrane for exposed rooftop applications.','Eurobit 4170 SL is finished with coloured mineral slate granules on the top face, giving built-in UV protection so the membrane can be left exposed on roofs and terraces without a screed or tile covering.','[{"label":"Thickness","value":"4 mm"},{"label":"Finish","value":"Mineral Slate"},{"label":"UV Resistance","value":"Excellent"},{"label":"Warranty","value":"Up to 10 years"}]','/__l5e/assets-v1/8faa5b0a-f072-4417-83dd-78f82f0578d6/eurobit-membrane.jpg','Roll of Eurobit 4170 SL mineral slate surfaced bitumen membrane, shown as a black torch-on roll with red band and eurobit branding.',20),
('eurobit-garden','Eurobit Garden','Bitumen Membrane','Root-resistant membrane for planters and green roofs.','Eurobit Garden carries a chemical root inhibitor in the bitumen compound, so roots from lawns, shrubs and planted terraces cannot penetrate the waterproofing layer. Supplied for green roofs, planter boxes and landscaped podium decks.','[{"label":"Thickness","value":"4 mm"},{"label":"Anti-Root","value":"Yes (chemical)"},{"label":"Reinforcement","value":"Polyester"},{"label":"Application","value":"Green roofs"}]','/__l5e/assets-v1/8faa5b0a-f072-4417-83dd-78f82f0578d6/eurobit-membrane.jpg','Roll of Eurobit Garden anti-root bitumen membrane for green roofs and planters, black torch-on roll with red band and eurobit branding.',30),
('eurobit-aluminium','Eurobit Aluminium','Bitumen Membrane','Aluminium-faced membrane, reflective and heat-resistant.','Eurobit Aluminium is laminated with an embossed aluminium foil facing that reflects sunlight and lowers surface temperature on exposed roofs, while the APP-modified bitumen core keeps the deck fully waterproof.','[{"label":"Thickness","value":"4 mm"},{"label":"Facing","value":"Aluminium foil"},{"label":"Reflectivity","value":"High"},{"label":"Use","value":"Exposed roofs"}]','/__l5e/assets-v1/8faa5b0a-f072-4417-83dd-78f82f0578d6/eurobit-membrane.jpg','Roll of Eurobit Aluminium foil-faced bitumen membrane, black torch-on roll with red band and eurobit branding.',40),
('euro-plast-sp','Euro-Plast SP','Admixture','Superplasticizer for high-strength concrete mixes.','High-range water reducer conforming to ASTM C-494 Type F & G. Improves workability, strength, and durability of structural concrete.','[{"label":"Type","value":"PCE-based"},{"label":"Dosage","value":"0.5 – 2.0% of cement"},{"label":"Standard","value":"ASTM C-494 F/G"},{"label":"Colour","value":"Amber liquid"}]',null,'Euro-Plast SP concrete superplasticizer admixture product image.',50),
('euro-cure','Euro-Cure','Admixture','Concrete curing compound for slabs and pavements.','Wax-based curing compound that forms a continuous membrane on fresh concrete, retaining moisture for full hydration and strength development.','[{"label":"Type","value":"Wax emulsion"},{"label":"Coverage","value":"4 – 6 m²/L"},{"label":"Standard","value":"ASTM C-309"},{"label":"Application","value":"Spray"}]',null,'Euro-Cure concrete curing compound product image.',60),
('euro-coat-ep','Euro-Coat EP','Coating','Epoxy protective coating for industrial floors and tanks.','Two-component solvent-free epoxy coating providing chemical resistance and abrasion protection for industrial floors, water tanks, and secondary containment.','[{"label":"System","value":"2K Epoxy"},{"label":"DFT","value":"300 – 500 µm"},{"label":"Pot Life","value":"45 min @ 25°C"},{"label":"Food Contact","value":"Available (FG grade)"}]',null,'Euro-Coat EP two-component epoxy protective coating product image.',70),
('euro-flex-pu','Euro-Flex PU','Coating','Liquid polyurethane waterproofing membrane.','Single-component moisture-curing polyurethane forming a seamless, elastic waterproof membrane over roofs, wet areas, and complex geometries.','[{"label":"Elongation","value":"> 400%"},{"label":"Coverage","value":"1.2 kg/m² (2 coats)"},{"label":"UV Resistance","value":"Yes"},{"label":"Colour","value":"Grey / White"}]',null,'Euro-Flex PU liquid polyurethane waterproofing membrane product image.',80),
('euro-seal-pu','Euro-Seal PU','Sealant','Polyurethane expansion joint sealant.','One-component elastic polyurethane sealant for expansion joints, curtain walls, and precast panel joints. Excellent adhesion and movement capability.','[{"label":"Movement","value":"±25%"},{"label":"Shore A","value":"35"},{"label":"Cure","value":"Moisture"},{"label":"Standard","value":"ASTM C-920"}]',null,'Euro-Seal PU polyurethane expansion joint sealant product image.',90);

-- Seed posts ----------------------------------------------------------
insert into public.posts (slug, title, tag, excerpt, body) values
('water-leakage-solutions-bahria-town','Water Leakage Solutions in Bahria Town','Bahria Town · Lahore & Islamabad','Roof leakage, bathroom seepage, basement moisture & tank cracks — what causes each problem in Bahria Town and how to fix it permanently.','Roof leakage, bathroom seepage, basement moisture and water tank cracks are the four most common complaints we receive from Bahria Town. Each has a different root cause and a different permanent fix.'),
('water-leakage-solutions-dha','Water Leakage Solutions in DHA','DHA · Lahore & Islamabad','Why DHA homes keep leaking after repairs — and the permanent fix for roof, bathroom, basement and water tank problems.','Most DHA leakage repairs fail because only the surface is patched. A properly torched membrane system solves it for a decade or more.'),
('waterproofing-problems-islamabad','Waterproofing Problems in Islamabad','Islamabad · All Sectors & Phases','Clay soil, hillside terrain and freeze-thaw winters make Islamabad''s waterproofing needs completely different from Lahore.','Islamabad sites need membranes that stay flexible through cold winters and resist hydrostatic pressure from hillside runoff.'),
('roof-leakage-saim-lahore','Roof Leakage & Saim in Lahore','Lahore · DHA, Johar Town, Gulberg','Lahore''s extreme heat, monsoon rains and high water table — why saim and roof leakage keep coming back.','Heat cycling cracks unprotected screeds, and a high water table pushes moisture up through foundations. Both need to be addressed together.'),
('top-10-waterproofing-companies-pakistan','Top 10 Waterproofing Companies in Pakistan','Pakistan · Industry Guide 2026','Ranked by experience, certifications, product quality, and coverage.','A practical guide to choosing a waterproofing contractor or manufacturer in Pakistan in 2026.'),
('waterproofing-bismillah-housing-scheme','Waterproofing in Bismillah Housing Scheme','Lahore · GT Road','Roof leakage, seepage, and construction chemical solutions for all sectors of Bismillah Housing Scheme.','Newly built homes on GT Road commonly show seepage within two monsoons. Here is what to specify at construction stage.');

-- Seed settings -------------------------------------------------------
insert into public.site_settings (key, value) values
('company_name','Eurobit'),
('phone','0313 9544444'),
('phone_link','+923139544444'),
('whatsapp','923139544444'),
('email','info@eurobit.online'),
('address','Industrial Estate, Kot Lakhpat, Lahore, Pakistan'),
('coverage','All Pakistan — Punjab, Sindh, KPK, Balochistan, AJK & Gilgit-Baltistan'),
('hours','Mon – Sat · 9:00 – 18:00'),
('hero_title','Waterproofing & construction chemicals, delivered across Pakistan.'),
('hero_subtitle','Eurobit manufactures modified bitumen membranes, concrete admixtures, and protective coatings — supplied nationwide from Karachi to Gilgit, built to withstand Pakistan''s monsoon rains, rising damp, and extreme summer heat.');