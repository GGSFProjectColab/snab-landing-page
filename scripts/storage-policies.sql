-- Storage policies for storage.objects and storage.buckets
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA storage TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA storage TO anon, authenticated;

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read objects" ON storage.objects;
CREATE POLICY "Public can read objects" ON storage.objects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow upload to public buckets" ON storage.objects;
CREATE POLICY "Allow upload to public buckets" ON storage.objects FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read buckets" ON storage.buckets;
CREATE POLICY "Allow read buckets" ON storage.buckets FOR SELECT USING (true);

-- Blog Assets Table for resilient image uploads and storage
CREATE TABLE IF NOT EXISTS blog_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  data TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read blog assets" ON blog_assets;
CREATE POLICY "Public can read blog assets" ON blog_assets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all for blog assets" ON blog_assets;
CREATE POLICY "Allow all for blog assets" ON blog_assets FOR ALL USING (true) WITH CHECK (true);

GRANT ALL ON blog_assets TO anon, authenticated, public;

