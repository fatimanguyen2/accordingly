INSERT INTO
  users(first_name, last_name, email, password)
VALUES
  ('Bert', 'Racoon', 'skate@evergreen.com', 'password'),
  ('Ralph', 'Racoon', 'scarfmodel@evergreen.com', 'password'),
  ('Cedric', ' Sneer', 'glasses@sneerinc.com', 'password'),
  ('Cyril', 'Sneer', 'ceo@sneerinc.com','password'),
  ('Sophia', 'Tutu', 'gymnast5star@evergreen.com', 'password');


INSERT INTO
  reocurrences(title, start_date, end_date, start_time, end_time, destination, user_id)
VALUES
('commute', '2020-03-05', null, '8:00:00', '4:00:00', point(49.23010, -123.10867), 2),
('morning run', '2020-03-05', null, '7:00:00', '7:30:00', point(49.259432, -123.100795), 2),
('skatepark', '2020-08-23', null, '16:00:00', '17:00:00', point(43.70564, -79.42154), 1),
('d&d nights', '2020-09-01', null, '19:00:00', '20:00:00', point(43.67398, -79.42789), 3),
('work', '2008-02-29', null, '9:00:00', '19:00:00', point(43.67559, -79.23953), 4);

INSERT INTO
  trips(title, start_time, end_time, destination, is_outdoor, user_id)
VALUES
('Going to see dad', '2020-11-08 14:30:00', '2020-11-08 17:30:00',point(43.67969, -79.29683), FALSE, 3),
('Gymn-a-thon', '2020-11-01 10:00:00', '2020-11-01 17:30:00',point(43.66808, -79.30635), TRUE, 5),
('Fundraiser', '2020-12-13 18:00:00', '2020-12-13 21:30:00',point(43.67969, -79.29683), FALSE, 4),
('Skate competition', '2020-11-17 13:45:00', '2020-11-17 18:30:00',point(43.66858, -79.35459), TRUE, 1),
('Comicon', '2020-09-05 11:00:00', '2020-09-05 21:30:00',point(44.22624, -76.49317), FALSE, 3);