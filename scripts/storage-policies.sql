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
