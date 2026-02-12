-- Add author_id to posts table referencing users table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS author_id BIGINT REFERENCES public.users(id);

-- Optional: Try to link existing posts to users by name match (if names match exactly)
-- This attempts to backfill the author_id for existing posts
UPDATE public.posts
SET author_id = users.id
FROM public.users
WHERE public.posts.author = public.users.name
AND public.posts.author_id IS NULL;

-- Enable helper to fetch department easily via Join
-- (Supabase/PostgREST automatically detects the Foreign Key for joins)
