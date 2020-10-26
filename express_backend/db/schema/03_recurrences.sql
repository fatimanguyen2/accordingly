DROP TABLE IF EXISTS recurrences CASCADE;

CREATE TABLE recurrences(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_from_start_date BOOLEAN NOT NULL,
    entry_id INTEGER REFERENCES entries(id) ON DELETE CASCADE
);