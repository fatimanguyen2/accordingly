const moment = require('moment');

const createEventList = (rawEvents) => {
  return {
    today: rawEvents[0].concat(checkReocsToday(rawEvents[1])).map(event => ({...event, weather : null })),
    repeating : groupByEntry(rawEvents[1].map(event => ({...event, next_event: getNextEvent(event) }))) || [],
    future : rawEvents[2].map(event => ({...event, weather : null }))
  };
};

const getRecurrenceArray = (event, list) => {
  for (const rec of list.repeating) {
    if (event.entry === rec.entry) {
      return rec
    }
  }
}


const groupByEntry = (events) => {
  const result = [];
  const distinctEvents = [];
  for (const event of events) {
    if (!distinctEvents.includes(event.entry_id)) {
      distinctEvents.push(event.entry_id)
    }
  }
  for (const id of distinctEvents) {
    const grouping = events.filter(event => event.entry_id === id)
    const { entry, start_time, end_time, start_date, end_date, entry_id, next_event, is_from_start_date, destination } = grouping[0];
    const group = {
      entry,
      id : entry_id,
      destination,
      start_date,
      end_date,
      start_time,
      end_time,
      is_from_start_date,
      next_event,
      next_weather : null,
      recurrences : []
    }
    
    for (const event of grouping) {
      const rec = {
        type_of : event.type_of,
        initial : event.initial,
        interval : event.interval
      }
      group.recurrences.push(rec)
    }
    result.push(group)
  }
  return result
}


const checkDayToday = (reoc, day) => {
  const fromInitial =  moment().dayOfYear() - moment(reoc.initial).dayOfYear()
  return (fromInitial % reoc.interval === 0)
};

const checkWeeklyToday = (reoc, day) => {
  const fromInitial =  moment().week() - moment(reoc.initial).week()
  return (moment(reoc.initial).day() === moment().day() && fromInitial % reoc.interval === 0)
};

const checkMonthlyToday = (reoc, day) => {
  const fromInitial =  moment().month() - moment(reoc.initial).month()
  return (moment(reoc.initial).date() === moment().date() && fromInitial % reoc.interval === 0)
};

const checkYearlyToday = (reoc, day) => {
  const fromInitial =  moment().year() - moment(reoc.initial).year()
  return (moment(reoc.initial).dayOfYear() === moment().dayOfYear() && fromInitial % reoc.interval === 0)
};

const checkReocsToday = (reocs, day) => {

  return reocs.filter((reoc) => {

    switch (reoc.type_of) {
      case 'daily':
        return checkDayToday(reoc);
      case 'weekly':
        return checkWeeklyToday(reoc);
      case 'monthly':
        return checkMonthlyToday(reoc);
      case 'yearly':
        return checkYearlyToday(reoc);
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

module.exports = {
  createEventList,
  checkReocsToday,
  getNextEvent
};
