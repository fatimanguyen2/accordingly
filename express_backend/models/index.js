const moment = require('moment');

module.exports = (db) => {

  const getUserEvents = (user, day) => {
    const now = moment().format("'YYYY-MM-D'")
    // const nowTest = "'2020-10-30'"

    const queryToday = (`
    SELECT title AS entry, entries.id, is_outdoor, trips.* FROM entries
    JOIN trips on trips.entry_id = entries.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND (start_time > ${now} AND start_time < ${now})
    `)

    const queryReocurrence = (`
    SELECT title AS entry, entries.id, is_outdoor, reocurrences.*, frequencies.* FROM entries
    JOIN reocurrences ON reocurrences.entry_id = entries.id
    JOIN frequencies ON reocurrence_id = reocurrences.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_date < ${now}
    `)

    const queryFuture = (`
    SELECT title AS entry, entries.id, is_outdoor, reocurrences.*, frequencies.* FROM entries
    JOIN reocurrences ON reocurrences.entry_id = entries.id
    JOIN frequencies ON reocurrence_id = reocurrences.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_date > ${now}
    `)

    const today = db.query(queryToday)
    const reocs = db.query(queryReocurrence)
    const future = db.query(queryReocurrence)

    return Promise.all([today, reocs, future])
      .then(results => [results[0].rows, results[1].rows, results[2].rows])
      .catch(err => err);
  }




  return {
    getUserEvents
  };
};