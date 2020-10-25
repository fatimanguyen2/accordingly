DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE trips(
    id SERIAL PRIMARY KEY NOT NULL,
    start_time DATE,
    end_time DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    destination POINT NOT NULL,
    entry_id INTEGER REFERENCES entries(id) ON DELETE CASCADE
);