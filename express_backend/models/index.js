const moment = require('moment');

module.exports = (db) => {

  const getUserEvents = (user, day) => {
    const now = moment().format("'YYYY-MM-D'")
    // const nowTest = "'2020-10-30'"

    const queryToday = (`
    SELECT title AS entry, entries.id, destination, is_outdoor, trips.* FROM entries
    JOIN trips on trips.entry_id = entries.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND (start_time > ${now} AND start_time < ${now})
    `)

    const queryRecurrence = (`
    SELECT title AS entry, entries.id, is_outdoor, destination, recurrences.*, frequencies.* FROM entries
    JOIN recurrences ON recurrences.entry_id = entries.id
    JOIN frequencies ON recurrence_id = recurrences.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_date < ${now}
    `)

    const queryFuture = (`
    SELECT title AS entry, entries.id, destination, is_outdoor, trips.* FROM entries
    JOIN trips on trips.entry_id = entries.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_time > ${now}
    `)

    const today = db.query(queryToday)
    const recs = db.query(queryRecurrence)
    const future = db.query(queryFuture)

    return Promise.all([today, recs, future])
      .then(results => [results[0].rows, results[1].rows, results[2].rows])
      .catch(err => err);
  }

  const getUserLocationById = (id) => {
    const query =(`
    SELECT home_location FROM users
    WHERE id = ${id}
    `)

    return db.query(query)
      .then(results => results.rows[0].home_location)
  } 

  return {
    getUserEvents,
    getUserLocationById
  };
};