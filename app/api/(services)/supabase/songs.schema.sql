CREATE TABLE chups_songs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  leads TEXT[] NOT NULL DEFAULT '{}',
  choirs TEXT[] NOT NULL DEFAULT '{}',
  duration INTEGER NOT NULL,
  lyrics_url TEXT,
  lyrics_html JSONB,
  lyrics_url_choir TEXT,
  lyrics_html_choir JSONB,
  audio_url TEXT NOT NULL,
  audio_url_choir_alto TEXT,
  audio_url_choir_sopranes TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_chups_songs_title ON chups_songs(title);
CREATE INDEX idx_chups_songs_artist ON chups_songs(artist);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chups_songs_updated_at
BEFORE UPDATE ON chups_songs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();