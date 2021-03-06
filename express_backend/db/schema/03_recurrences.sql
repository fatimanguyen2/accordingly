DROP TABLE IF EXISTS recurrences CASCADE;

CREATE TABLE recurrences(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date DATE NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    entry_id INTEGER REFERENCES entries(id) ON DELETE CASCADE
);