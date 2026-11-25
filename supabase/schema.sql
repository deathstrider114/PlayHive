-- PlayHive initial Supabase schema
-- Run this entire file in Supabase Dashboard > SQL Editor.
-- Safe to re-run: tables and policies are created conditionally.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text not null default '',
  xp integer not null default 0 check (xp >= 0),
  level integer not null default 1 check (level >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_format check (
    username is null or username ~ '^[a-zA-Z0-9_]{3,20}$'
  )
);

-- Add progression columns when profiles already existed before this schema ran.
alter table public.profiles
  add column if not exists xp integer not null default 0 check (xp >= 0),
  add column if not exists level integer not null default 1 check (level >= 1);

create table if not exists public.user_favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, game_slug)
);

create table if not exists public.recently_played (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_slug text not null,
  last_played_at timestamptz not null default now(),
  play_count integer not null default 1 check (play_count > 0),
  primary key (user_id, game_slug)
);

alter table public.profiles enable row level security;
alter table public.user_favourites enable row level security;
alter table public.recently_played enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can manage their own favourites" on public.user_favourites;
create policy "Users can manage their own favourites"
  on public.user_favourites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage their own recently played" on public.recently_played;
create policy "Users can manage their own recently played"
  on public.recently_played for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create index if not exists recently_played_user_last_played_idx
  on public.recently_played (user_id, last_played_at desc);

-- Keep progression values server-controlled. Users can edit their public
-- profile fields, but cannot grant themselves XP or levels through the API.
revoke update (xp, level) on table public.profiles from authenticated;
grant update (username, display_name, avatar_url, bio) on table public.profiles to authenticated;
revoke insert (xp, level) on table public.profiles from authenticated;
grant insert (id, username, display_name, avatar_url, bio) on table public.profiles to authenticated;
