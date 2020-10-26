DROP TABLE IF EXISTS frequencies CASCADE;

CREATE TABLE frequencies(
  id SERIAL PRIMARY KEY NOT NULL,
  type_of VARCHAR NOT NULL,
  initial DATE,
  interval INTEGER,
  recurrence_id INTEGER REFERENCES recurrences(id) ON DELETE CASCADE
);