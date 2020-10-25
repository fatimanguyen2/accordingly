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

  return {
    getUserDay,
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts
  };
};