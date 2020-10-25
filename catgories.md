hot = ( t > 25 )
warm = ( 18 < t < 24)
temperate = ( 10 < t < 18 )
cool = ( 0 < t < 10)
cold = ( -10 < t < 0)
very_cold = ( - 10 < t < -20)
 
humid = humidity > 60%
moderate_hum = 40% < h < 60%
dry = h < 40%

rainy = any number of rain hourly precipitation BUT hourly.weather.main  IS NOT DRIZZLE
ground_wet = (hourly rain precipitation > 2.6mm/hr)

uv_moderate = 6 > UVI > 3
uv_heavy = UVI > 6

windy = windspeed > 20km/h

cold_wind = windspeed > 20km/h AND T < 15

slippery = black ice condition

low_visib = visib < treshold
