DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE trips(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_time DATE,
    end_time DATE,
    created_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);