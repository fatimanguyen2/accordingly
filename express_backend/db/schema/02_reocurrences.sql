DROP TABLE IF EXISTS reocurrences CASCADE;

CREATE TABLE reocurrences(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);