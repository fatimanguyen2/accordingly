const moment = require('moment');

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  }

  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, email, password]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
    }

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  }

  const getUserDay = (user, day) => {
    const now = moment().format("'YYYY-MM-D'")

    const queryTrips = (`
    SELECT title AS entry, is_outdoor, trips.* FROM entries
    JOIN trips on trips.entry_id = entries.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND (start_time > '2020-11-17' AND start_time < '2020-11-18')
    `)/// fixed date to be replace by dynamic today

    const queryReocurrence = (`
    SELECT title AS entry, is_outdoor, reocurrences.*, frequencies.* FROM entries
    JOIN reocurrences ON reocurrences.entry_id = entries.id
    JOIN frequencies ON reocurrence_id = reocurrences.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_date < '2020-11-17'
    `)/// fixed date to be replace by dynamic today

    const trips = db.query(queryTrips)
    const reocs = db.query(queryReocurrence)

    return Promise.all([trips, reocs])
    .then(results => [results[0].rows, results[1].rows])
    .catch(err => err);
  }

  const computeWeekly = (reoc, day) => {
    const fromInitial =  moment().week() - moment(reoc.initial).week()
    return (moment(reoc.initial).day() === moment().day() && fromInitial % reoc.interval === 0)
  };
  
  const computeMonthly = (reoc, day) => {
    const fromInitial =  moment().month() - moment(reoc.initial).month()
    return (moment(reoc.initial).date() === moment().date() && fromInitial % reoc.interval === 0)
  };
  
  const computeYearly = (reoc, day) => {
    const fromInitial =  moment().year() - moment(reoc.initial).year()
    return (moment(reoc.initial).dayOfYear() === moment().dayOfYear() && fromInitial % reoc.interval === 0)
  };
  
  const computeReocs = (reocs, day) => {
  
    return reocs.filter((reoc) => {
  
      switch (reoc.type_of) {
        case 'daily':
          return true;
        case 'weekly':
          return computeWeekly(reoc);
        case 'monthly':
          return computeMonthly(reoc);
        case 'yearly':
          return computeYearly(reoc);
      }
    })
  }

  return {
    getUserDay,
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts,
    computeReocs
  };
};