-- Setup blogs table and policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blogs
DROP POLICY IF EXISTS "Public can read published blogs" ON public.blogs;
CREATE POLICY "Public can read published blogs" ON public.blogs
  FOR SELECT
  USING (status = 'published');

-- Allow all operations for API
DROP POLICY IF EXISTS "Allow all for authenticated/anon backend" ON public.blogs;
CREATE POLICY "Allow all for authenticated/anon backend" ON public.blogs
  FOR ALL
  USING (true)
  WITH CHECK (true);
