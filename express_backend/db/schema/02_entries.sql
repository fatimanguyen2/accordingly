DROP TABLE IF EXISTS entries CASCADE;

CREATE TABLE entries(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  is_outdoor BOOLEAN,
  created_at TIMESTAMP DEFAULT now(),
  destination POINT NOT NULL,
  mode VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  address VARCHAR(255),
  city VARCHAR(255),
  postal_code VARCHAR(255),
  user_id INTEGER REFERENCES entries(id) ON DELETE CASCADE
);