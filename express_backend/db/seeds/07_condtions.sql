INSERT INTO
  conditions(name, description)
VALUES
('hot', 'Temperature above 25C'), --1
('warm', 'Temperature between 18C and 24C'), --2
('temperate', 'Temperature between 10C and 18C'), --3
('cool', 'Temperature between 0C and 10C'), --4
('cold', 'Temperature between -10C and 0C'), --5
('very_cold', 'Temperature below -10C'), --6
('humid', 'Humidity above 60%'), --7
('moderate_hum', 'Humidity between 40% and 60%'), --8
('dry', 'Humidity below 40%'), --9
('rainy', 'Precipitation more intense than "drizzle"'), --10
('wet_ground', 'Precipitation above 2.6mm/hr'), --11
('uv_moderate', 'UV index between 3 and 6'), --12
('uv_heavy', 'UV index above 6'), --13
('windy', 'Windspeed above 20km/h'), --14
('cold_wind', 'Windspeed above 20km/h and temperature below 15C'), --15
('slippery', 'presence of black ice'), --16
('low_visib', 'Visibility under 100 meters'), --17
('pandemic', 'Covid 19 pandemic'), --18
('hot & humid', 'Temperature above 25C and high dew point'); --19
