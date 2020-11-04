# Accordingly
Let me introduce our app accordingly. It gives our user advice on what to wear or bring according to the environmental factors such as weather, air quality, uv index during their trip/activity so they’re not gonna get caught out in the rain without an umbrella. We like to think of it as the loving advice of a mom or dad would give before you leave home. To accomplish this, our app has two main views, the home and schedule.


## Team
  ### [Fatima Nguyen](https://github.com/fatimanguyen2)
  ### [Lanny Rivest](https://github.com/LawfulKami)
  ### [Sean Ni](https://github.com/NX915)

## What does it look like

### General Navigation

![navigation](https://github.com/LawfulKami/accordingly/blob/main/docs/app-navigation.gif?raw=true)

### Login page
![landingpage](https://github.com/LawfulKami/accordingly/blob/main/docs/login-animation.gif?raw=true)

###

## Stack
  * React
  * Node.JS
  * Express
  * PostgreSQL

## Dependencies

  * @fortawesome/fontawesome-svg-core: ^1.2.32
  * @fortawesome/free-solid-svg-icons: ^5.15.1
  * @fortawesome/react-fontawesome: ^0.1.11
  * @n8tb1t/use-scroll-position: ^2.0.3
  * @testing-library/jest-dom: ^4.2.4
  * @testing-library/react: ^9.3.2
  * @testing-library/user-event: ^7.1.2
  * moment: ^2.29.1
  * node-sass: ^4.14.1
  * react": ^16.14.0
  * react-dom: ^16.14.0
  * react-places-autocomplete: ^7.3.0
  * react-router-dom: ^5.2.0
  * react-cripts": 3.4.4
  * typescript": ^4.0.3
  * axios: ^0.21.0
  * cookie-parser: ~1.4.4
  * debug": ~2.6.9
  * dotenv: ^8.2.0
  * express: ~4.16.1
  * http-errors: ~1.6.3
  * morgan: ~1.9.1
  * node-gyp: ^7.1.2
  * pg": ^8.4.2
  * pg-native: ^3.0.0
  * rebuild: ^0.1.2
  
## APIs
  
 * Open Weather
 * Google Maps

## Setup

1. Create your .env file by referencing the .env.example. You'll need to set up a database and APIs keys.
2. Install dependencies in both client and server directories using npm install.
3. Create the database, then set and seed the database using npm run db:reset.
4. From the client directory: npm start.
5. From the server directory: npm run server.
6. Visit http://localhost:3000/
