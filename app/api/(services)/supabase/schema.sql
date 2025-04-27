-- Table: shows
CREATE TABLE chups_shows (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: auditoriums
CREATE TABLE chups_auditoriums (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  location_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: show_dates
CREATE TABLE chups_show_dates (
  id BIGSERIAL PRIMARY KEY,
  show_id BIGINT NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  adult_price NUMERIC NOT NULL,
  child_price NUMERIC NOT NULL,
  auditorium_id BIGINT NOT NULL REFERENCES auditoriums(id) ON DELETE RESTRICT,
  external_booking_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_show_dates_show_id ON show_dates(show_id);
CREATE INDEX idx_show_dates_auditorium_id ON show_dates(auditorium_id);
CREATE INDEX idx_show_dates_date ON show_dates(date);