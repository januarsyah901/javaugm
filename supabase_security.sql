-- Enable RLS on Posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts" 
ON public.posts 
FOR SELECT 
USING (is_published = true);

-- Allow authenticated users (e.g. admin dashboard) to view all posts
CREATE POLICY "Admin can view all posts" 
ON public.posts 
FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users to insert/update/delete posts (Assuming admin role)
-- You can refine this by checking role if you have roles set up
CREATE POLICY "Admin can modify posts" 
ON public.posts 
FOR ALL 
TO authenticated 
USING (true);

-- Enable RLS on Users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for author info)
CREATE POLICY "Public can view users" 
ON public.users 
FOR SELECT 
USING (true);

-- Allow admins to modify users
CREATE POLICY "Admin can modify users" 
ON public.users 
FOR ALL 
TO authenticated 
USING (true);
