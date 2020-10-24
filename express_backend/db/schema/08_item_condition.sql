DROP TABLE IF EXISTS item_condition CASCADE;

CREATE TABLE item_condition(
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  condition_id INTEGER REFERENCES conditions(id) ON DELETE CASCADE
);