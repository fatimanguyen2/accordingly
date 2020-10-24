DROP TABLE IF EXISTS frequencies CASCADE;

CREATE TABLE frequencies(
  id SERIAL PRIMARY KEY NOT NULL,
  type_of VARCHAR NOT NULL,
  interval INTEGER,
  reoccurence_id INTEGER REFERENCES reocurrences(id) ON DELETE CASCADE
)