-- Rode este script uma vez no seu banco Postgres (ex.: Supabase > SQL Editor)

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  answers JSONB NOT NULL,
  breakdown JSONB NOT NULL,
  level_code TEXT NOT NULL,
  level_label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email_sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_submissions_pending
  ON submissions (created_at)
  WHERE email_sent_at IS NULL;
