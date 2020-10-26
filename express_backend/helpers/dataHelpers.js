const moment = require('moment');

const createEventList = (rawEvents) => {
  return {
    today: rawEvents[0].concat(checkReocsToday(rawEvents[1])),
    repeating : rawEvents[1].map(event => ({...event, next_event: getNextEvent(event) })),
    future : rawEvents[2]
  };
};

// const getEventOfDay = (day) => {
//   return day.map(event => {
//     const { entry, start_time, end_time, destination } = event;
//     return {
//       entry,
//       start_time,
//       end_time,
//       destination : destination
//     }
//   })
// }

const groupByEntry = (events) => {
  const distinctEvents = [];
  for (const event of events) {
    if (!distinctEvent.includes(event.entry_id)) {
      distinctEvent.push(event.entry_id)
    }
  }
  for (const id of distinctEvents) {
    const grouping = events.filter(event => event.entry_id === id)
    const { entry, start_time, end_time, start_date, end_date } = grouping[0];
    
    

    for (const event of grouping) {
      if (!group[event.entry_id]){
        group[entry_id] = [event];
      } else {
        group[entry_id].push(event)
      }
    }
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
