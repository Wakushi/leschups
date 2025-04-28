CREATE TABLE chups_bookings (
    id BIGSERIAL PRIMARY KEY,
    show_date_id BIGINT NOT NULL REFERENCES chups_show_dates(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    adult_tickets INTEGER NOT NULL,
    child_tickets INTEGER NOT NULL,
    total_price NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    confirmation_id TEXT,
    cheque BOOLEAN DEFAULT FALSE,
    cash BOOLEAN DEFAULT FALSE,
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_show_date_id ON chups_bookings(show_date_id);
CREATE INDEX idx_bookings_email ON chups_bookings(email);
CREATE INDEX idx_bookings_status ON chups_bookings(status);

ALTER TABLE chups_bookings ADD CONSTRAINT check_booking_status 
    CHECK (status IN ('PENDING', 'DONE')); 