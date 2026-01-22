-- Create the apps table
create table apps (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  url text not null,
  icon text not null,
  category text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- (Optional) Example insert for default data
/*
insert into apps (name, description, url, icon, category, status) values
  ('DreamPlay Vision', 'AI Hand Analysis', 'https://vision.dreamplay.studio', 'Video', 'Tools', 'Beta'),
  ('DreamLink', 'Link-in-bio for musicians', 'https://link.dreamplay.studio', 'Link', 'Tools', 'Free');
*/
