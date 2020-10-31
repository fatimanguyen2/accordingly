const moment = require('moment');

module.exports = (db) => {

  const getUserEvents = (user) => {
    const now = moment().format("'YYYY-MM-DD'")
    const tomorrow = moment().add(1, "d").format("'YYYY-MM-DD'")
    // const nowTest = "'2020-10-30'"
    const queryToday = (`
    SELECT 
    title AS entry, 
    entries.id, 
    destination, 
    address,
    city,
    postal_code,
    is_outdoor, 
    trips.* 
    FROM entries
    JOIN trips on trips.entry_id = entries.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND (start_time > ${now} AND start_time < ${tomorrow})
    `)

    const queryRecurrence = (`
    SELECT 
    title AS entry, 
    entries.id, 
    destination, 
    address,
    city,
    postal_code,
    is_outdoor, 
    recurrences.*, 
    frequencies.*
    FROM entries
    JOIN recurrences ON recurrences.entry_id = entries.id
    JOIN frequencies ON recurrence_id = recurrences.id
    WHERE user_id = ${user} 
    AND entries.is_active = TRUE 
    AND start_date < ${now}
    `)

    const queryFuture = (`
    SELECT 
    title AS entry, 
    entries.id, 
    destination, 
    address,
    city,
    postal_code,
    is_outdoor, 
    trips.*
    FROM entries
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

  const getUserAddressById = (id) => {
    const query =(`
    SELECT address, city, postal_code FROM users
    WHERE id = ${id}
    `)
    return db.query(query)
      .then(results => {
        return {
          street : results.rows[0].address,
          city : results.rows[0].city,
          postal_code : results.rows[0].postal_code
        }
      })
    }

  const getImmediateRecommendations = (conditions) => {
    let nowCond = conditions
    console.log(nowCond)
    const temp = nowCond.shift()
    let queryImmediate = (`
      SELECT DISTINCT items.id, items.name, items.description FROM items
      JOIN item_condition ON item_id = items.id
      JOIN conditions ON condition_id = conditions.id
      WHERE conditions.name = '${temp}'
    `)

    for (const condition of nowCond) {
      queryImmediate += (`
      OR conditions.name = '${condition}'
      `)
    }
    
    return db.query(queryImmediate)

  }

  const getRecommendations = (conditions) => {
    let nowCond = conditions[0]
    const temp = nowCond.shift()
    let futurCond = conditions[1]
    let queryNow = (`
      SELECT DISTINCT items.id, items.name, items.description FROM items
      JOIN item_condition ON item_id = items.id
      JOIN conditions ON condition_id = conditions.id
      WHERE conditions.name = '${temp}'
    `)

    for (const condition of nowCond) {
      queryNow += (`
      OR conditions.name = '${condition}'
      `)
    }

    const first = futurCond.shift()
    let queryFuture = (`
    SELECT DISTINCT items.id, items.name, items.description FROM items
    JOIN item_condition ON item_id = items.id
    JOIN conditions ON condition_id = conditions.id
    WHERE conditions.name = '${first}'
    `)

    for (const condition of futurCond) {
      queryNow += (`
      OR conditions.name = '${condition}'
      `)
    }

    const now = db.query(queryNow)
    const later = db.query(queryFuture)

    return Promise.all([now, later])
      .then(results => ({now : results[0].rows, later : results[1].rows}))
  }

  const makeEntryInactive = (entryID) => {
    const query = (`
    UPDATE entries
    SET is_active = FALSE
    WHERE id = ${entryID}
    RETURNING *
    `)

    return db.query(query)
      .then(results => results.rows[0])
  }

  const postEntry = (entry, user_id) => {
    let newEntryId
    return db.query(`
    INSERT INTO entries(title, is_outdoor, destination, address, city, postal_code, user_id)
      VALUES
        ($1, null, point(${entry.destination.x}, ${entry.destination.y}), '${entry.street}', '${entry.city}', '${entry.postal_code || null}', ${user_id})
    RETURNING entries.id
    `, [`${entry.title}`])
    .then(id => {
      newEntryId = id.rows[0].id
      const formattedEntry = {...entry, id : newEntryId}
      if (!entry.recurrences.length) {
        const trip = createTrip(formattedEntry)
        return postTrip(trip)
      } else {
        const rec = createRec(formattedEntry)
        return postRec(rec)
        .then(id => {
          const formattedRec = {...rec, id : id.rows[0].id}
          const frequencies = formattedEntry.recurrences.map(freq => createFrequency(freq, formattedRec))
          return postFreqs(frequencies)
        })
      }
    })
    .then(() => getEntryById(newEntryId))
  }

  const getEntryById = (id) => {

    return db.query(`
    SELECT 
    title AS entry, 
    entries.id as entry_id,
    destination, 
    address,
    city,
    postal_code,
    is_outdoor, 
    trips.id AS trip_id,
    trips.start_time AS trip_start_time,
    trips.end_time AS trip_end_time,
    recurrences.id AS recurrence_id,
    recurrences.start_date,
    recurrences.start_hour,
    recurrences.end_hour,
    frequencies.id AS frequency_id,
    frequencies.type_of,
    frequencies.initial,
    frequencies.interval
    FROM entries
    LEFT JOIN trips on trips.entry_id = entries.id
    LEFT JOIN recurrences ON recurrences.entry_id = entries.id
    LEFT JOIN frequencies ON recurrence_id = recurrences.id
    WHERE entries.id = ${id}
    `)
  }


  const postTrip = (trip) => {
    return db.query(`
    INSERT INTO trips(start_time, end_time, entry_id)
      VALUES
      ('${trip.start_time}', '${trip.end_time}', ${trip.entry_id})
    `)
  }

  const postRec = (rec) => {
    return db.query(`
    INSERT INTO recurrences(start_date, start_hour, end_hour, entry_id)
      VALUES
      ('${rec.start_date}', '${rec.start_hour}', '${rec.end_hour}', ${rec.entry_id})
    RETURNING recurrences.id
    `)
  }

  const postFreqs = (freqs) => {
    let queryGen = (`
    INSERT INTO frequencies(type_of, interval, initial, recurrence_id)
      VALUES
    `)

    for(const freq of freqs) {
      queryGen += `('${freq.type_of}', ${freq.interval}, '${freq.initial}', ${freq.recurrence_id}),`
    }

    const query = queryGen.slice(0, -1)
    return db.query(query)
  }


  const createTrip = (entry) => {
    return {
      start_time : entry.start_date + " " + entry.start_hour,
      end_time : entry.end_date + " " + entry.end_hour,
      entry_id : entry.id
    }
  }

  const createRec = (entry) => {
    return {
      start_date : entry.start_date,
      start_hour : entry.start_hour,
      end_hour : entry.end_hour,
      entry_id : entry.id
    }
  }
  
  const createFrequency = (freq, rec) => {
    let type_of = '';
    let initial = rec.start_date;
    switch (freq.type_of) {
      case 'day':
        type_of = "daily";
        break;
      case 'month':
        type_of = "monthly";
        break;
      case 'year':
        type_of = "yearly";
        break;
      default:
        type_of = "weekly";
      if (rec.type_of !== 'week' ) {
        initial = moment(rec.start_date).day(freq.type_of).format('YYYY-MM-DD')
        }
    }
    return {
      type_of,
      initial,
      interval : freq.interval,
      recurrence_id : rec.id,
    }

  }
  


  return {
    getUserEvents,
    getUserLocationById,
    getUserAddressById,
    makeEntryInactive,
    postEntry,
    getImmediateRecommendations,
    getRecommendations
  };
};