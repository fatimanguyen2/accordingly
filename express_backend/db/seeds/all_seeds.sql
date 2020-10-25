INSERT INTO
  users(first_name, last_name, email, password, home_location)
VALUES
  ('Bert', 'Racoon', 'skate@evergreen.com', 'password', point(49.24713, -123.10867)),
  ('Ralph', 'Racoon', 'scarfmodel@evergreen.com', 'password', point(43.69854, -79.41188)),
  ('Cedric', ' Sneer', 'glasses@sneerinc.com', 'password', point(43.70415, -79.38875)),
  ('Cyril', 'Sneer', 'ceo@sneerinc.com','password', point(43.67969, -79.29683)),
  ('Sophia', 'Tutu', 'gymnast5star@evergreen.com', 'password', point(43.68757, -79.35871));

INSERT INTO
  entries(title, is_outdoor, user_id)
VALUES
('commute', TRUE, 2),
('morning run', TRUE, 2),
('skatepark', TRUE, 1),
('d&d nights', FALSE, 3),
('work', FALSE, 4),
('Going to see dad', FALSE, 3),
('Gymn-a-thon', TRUE, 5),
('Fundraiser', FALSE, 4),
('Skate competition', TRUE, 1),
('Comicon', FALSE, 3);


INSERT INTO
  reocurrences(start_date, end_date, start_time, end_time, destination, entry_id)
VALUES
('2020-03-05', null, '8:00:00', '4:00:00', point(49.23010, -123.10867), 1),
('2020-03-05', null, '7:00:00', '7:30:00', point(49.259432, -123.100795), 2),
('2020-08-23', null, '16:00:00', '17:00:00', point(43.70564, -79.42154), 3),
('2020-09-01', null, '19:00:00', '20:00:00', point(43.67398, -79.42789), 4),
('2008-02-29', null, '9:00:00', '19:00:00', point(43.67559, -79.23953), 5);

INSERT INTO
  frequencies(type_of, interval, initial, reocurrence_id)
VALUES
('weekly', 1, '2020-03-09', 1),
('weekly', 1, '2020-03-09', 1),
('weekly', 1, '2020-03-09', 1),
('weekly', 1, '2020-03-09', 1),
('weekly', 1, '2020-03-09', 1),
('daily', 1,'2020-03-05', 2),
('weekly', 2, '2020-08-23', 3),
('weekly', 4, '2020-09-01', 4),
('monthly', 1, '2008-02-15', 5);

INSERT INTO
  trips(start_time, end_time, destination, entry_id)
VALUES
('2020-11-08 14:30:00', '2020-11-08 17:30:00',point(43.67969, -79.29683), 6),
('2020-11-01 10:00:00', '2020-11-01 17:30:00',point(43.66808, -79.30635), 7),
('2020-12-13 18:00:00', '2020-12-13 21:30:00',point(43.67969, -79.29683), 8),
('2020-11-17 13:45:00', '2020-11-17 18:30:00',point(43.66858, -79.35459), 9),
('2020-09-05 11:00:00', '2020-09-05 21:30:00',point(44.22624, -76.49317), 10);