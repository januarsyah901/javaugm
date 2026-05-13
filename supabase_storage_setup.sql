
-- Create a public bucket for article images
-- Note: This might require extensions or specific permissions if run via SQL editor
-- Alternatively, create it manually in Supabase Dashboard Storage section

-- Create bucket 'images' if it doesn't exist
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO NOTHING;

-- Set up RLS for Storage
-- Allow public access to read images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update/delete their own images (or all if admin)
CREATE POLICY "Authenticated users can update/delete images" 
ON storage.objects FOR ALL 
TO authenticated 
USING (bucket_id = 'images');
