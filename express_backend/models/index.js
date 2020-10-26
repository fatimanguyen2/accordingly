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

  const checkDay = (reoc, day) => {
    const fromInitial =  moment().dayOfYear() - moment(reoc.initial).dayOfYear()
    return (fromInitial % reoc.interval === 0)
  };

  const checkWeekly = (reoc, day) => {
    const fromInitial =  moment().week() - moment(reoc.initial).week()
    return (moment(reoc.initial).day() === moment().day() && fromInitial % reoc.interval === 0)
  };
  
  const checkMonthly = (reoc, day) => {
    const fromInitial =  moment().month() - moment(reoc.initial).month()
    return (moment(reoc.initial).date() === moment().date() && fromInitial % reoc.interval === 0)
  };
  
  const checkYearly = (reoc, day) => {
    const fromInitial =  moment().year() - moment(reoc.initial).year()
    return (moment(reoc.initial).dayOfYear() === moment().dayOfYear() && fromInitial % reoc.interval === 0)
  };
  
  const checkReocsToday = (reocs, day) => {
  
    return reocs.filter((reoc) => {
  
      switch (reoc.type_of) {
        case 'daily':
          return checkDay(reoc);
        case 'weekly':
          return checkWeekly(reoc);
        case 'monthly':
          return checkMonthly(reoc);
        case 'yearly':
          return checkYearly(reoc);
      }
    })
  }

  const getNextEvent = (reoc) => {
    switch (reoc.type_of) {
      case 'daily':
        return moment(reoc.initial).add(reoc.interval,'d')
      case 'weekly':
        return moment(reoc.initial).add(reoc.interval,'w')
      case 'monthly':
        return moment(reoc.initial).add(reoc.interval,'M')
      case 'yearly':
        return moment(reoc.initial).add(reoc.interval,'y')
    }
  }


  return {
    getUserEvents,
    checkReocsToday,
    getNextEvent
  };
};