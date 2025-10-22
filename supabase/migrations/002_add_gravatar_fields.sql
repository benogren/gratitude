-- Add Gravatar fields to user_profiles table
alter table public.user_profiles
  add column if not exists gravatar_hash text,
  add column if not exists location text,
  add column if not exists job_title text,
  add column if not exists company text,
  add column if not exists gravatar_fetched boolean default false;
