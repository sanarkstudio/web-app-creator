CREATE TABLE public.lectura_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lectura_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can submit a request
CREATE POLICY "Anyone can create lectura requests"
ON public.lectura_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read access (only via service role from edge functions)
CREATE INDEX idx_lectura_requests_created_at ON public.lectura_requests(created_at DESC);