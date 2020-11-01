const moment = require('moment');
const { getLeaveBy, getMultipleTripTime } = require('../APIs/google_map');
const { getForecastCategory, getWeather } = require('../APIs/open_weather')
const db = require('../db');
const dataQ = require('../models')(db);

const createEventList = (rawEvents, id) => {
  return dataQ.getUserLocationById(id)
    .then(origin => todayFormatting(rawEvents[0], rawEvents[1], origin))
    .then(today => {
      return {
        today: sortEventChrono(today),
        repeating : groupByEntry(rawEvents[1].map(event => ({...event, next_event: getNextEventFromRec(event)}))) || [],///needs refatoring
        future : sortEventChrono(rawEvents[2].map(event => ({...event, start_time : moment(event.start_time).format(), end_time: moment(event.end_time).format()} )))
      };
    })
    .then(eventList => {
      const todayWeather = eventList.today.map(event => getForecastCategory(event))
      const nextEventWeater = eventList.repeating.map(event => getForecastCategory(event.next_event))
      const futureWeater = eventList.future.map(event => getForecastCategory(event))
      const promisedWeather = [ todayWeather, nextEventWeater, futureWeater ]
      return Promise.all(promisedWeather.map(weather => Promise.all(weather)))
        .then(allWeather => {
          return {
            today : eventList.today.map((event, index) => ({...event, weather : allWeather[0][index]})),
            repeating : eventList.repeating.map((event, index) => ({...event, next_event : ({...event.next_event, weather : allWeather[1][index]})})),
            future : eventList.future.map((event, index) => ({...event, weather : allWeather[2][index]}))
          }
        })
    })
    .catch(err => console.log(err))
};

const formatEntryForFrontEnd = (entry) => {
  if (entry[0].recurrence_id) {
    const formarttedRec = groupByEntry(entry.map(event => ({...event, next_event: getNextEventFromRec(event)})))
    return getForecastCategory(formarttedRec[0].next_event)
      .then(weather => ({...formarttedRec[0], next_event : ({...formarttedRec[0].next_event, weather : weather})}))
  } else {
    const formattedEvent = { ...entry[0], start_time: moment(entry[0].trip_start_time).format(), end_time : moment(entry[0].trip_end_time).format()}
    console.log(formattedEvent)
    return getForecastCategory(formattedEvent)
      .then(weather => {
        const { entry, entry_id, destination, address, city, postal_code, trip_id, start_time, end_time } = formattedEvent;
        return { 
          entry, 
          entry_id, 
          destination, 
          address, 
          city, 
          postal_code, 
          event_id : trip_id, 
          start_time, 
          end_time, 
          weather : weather
        }
      })
  }
}


const todayFormatting = (rawToday, rawRec, origin) => {
  const today = rawToday.concat(checkReocsToday(rawRec)).map(event => {
    if (!event.start_time){
      const start_time = moment(getTodayRecStartTime(event)).format();
      const end_time = moment(getTodayRecEndTime(event)).format();
      return ({
      ...event,
        start_time,
        end_time
      })
    }
    return  ({
        ...event,
        start_time : moment(event.start_time).format(),
        end_time : moment(event.end_time).format()
      })
  })
  const fromNow = updateTodayToNow(today)
  const leaveBys = fromNow.map(event => getLeaveBy(origin, event));
  return Promise.all(leaveBys)
  .then(departures => fromNow.map((event, index) => {
      return ({
        ...event,
        leave_by: moment(departures[index]).format()
      })
  }))
};


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
    const { entry, start_hour, end_hour, start_date, end_date, entry_id, is_from_start_date, destination, address, city } = grouping[0];
    const group = {
      entry,
      entry_id,
      start_date,
      end_date,
      start_hour,
      end_hour,
      is_from_start_date,
      next_event : {
        address,
        city,
        start_time : getFirstEventTime(grouping).format("YYYY-MM-DD") + "T" + start_hour,
        end_time : getFirstEventTime(grouping).format("YYYY-MM-DD") + "T" + end_hour,
        destination
      },
      recurrences : []
    }
    
    for (const event of grouping) {
      const rec = {
        id: event.id,
        type_of : event.type_of,
        initial : event.initial,
        interval : event.interval,
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

const getNextEventFromRec = (reoc) => {
  switch (reoc.type_of) {
    case 'daily':
      const fromInitialDay =  moment().dayOfYear() - moment(reoc.initial).dayOfYear();
      const cycleDay = Math.floor(fromInitialDay/reoc.interval) + 1;
      return moment(reoc.initial).add(cycleDay * reoc.interval,'d');
    case 'weekly':
      const fromInitialWeek =  moment().week() - moment(reoc.initial).week();
      let cycleWeek = Math.floor(fromInitialWeek/reoc.interval);
      if (moment().day() >= moment(reoc.initial).day()) {
        cycleWeek ++;
      };
      return moment(reoc.initial).add(cycleWeek * reoc.interval,'w');
    case 'monthly':
      const fromInitialMonth =  moment().month() - moment(reoc.initial).month();
      const cycleMonth = Math.floor(fromInitialMonth/reoc.interval);
      if (moment().date() >= moment(reoc.initial).date()) {
        cycleMonth ++;
      };
      return moment(reoc.initial).add(cycleMonth * reoc.interval,'M');
    case 'yearly':
      const fromInitialYear =  moment().year() - moment(reoc.initial).year();
      const cycleYear = Math.floor(fromInitialYear/reoc.interval);
      if (moment().dayOfYear() >= moment(reoc.initial).dayOfYear()) {
        cycleYear ++;
      };
      return moment(reoc.initial).add(cycleYear * reoc.interval,'y');
  }
}


const formatTimeForDb = (date, hour) => {
  return date + "T" + hour
}

const getTodayRecStartTime = (rec) => {
  return moment().format("YYYY-MM-DD") + "T" + rec.start_hour;
}

const getTodayRecEndTime = (rec) => {
  return moment().format("YYYY-MM-DD") + "T" + rec.end_hour;
}

const updateTodayToNow = (today) => {
  return today.filter(event => {
    if(event.start_time) {
      return moment(event.start_time) > moment();
    } else {
      return moment(getTodayRecStartTime(event)) > moment();
    }
  })
}


const getFirstEventTime = (events) => {
  let firstEventTime = events[0].next_event;
  for (const event of events) {
    if (event.next_event < firstEventTime) {
      firstEventTime = event.next_event;
    }
  }
  return firstEventTime;
}


const sortEventChrono = (events) => {
  return events.sort((a, b) => moment(a.start_time).unix() - moment(b.start_time).unix())
}


const getTripsToday = (origin, today) => {
  const path = [[origin, today[0].destination]];
  if (today.length > 0) {
    for (let x = 1; x < today.length; x ++) {
      path.push([today[x-1].destination, today[x].destination])
    }
    path.push([today[today.length - 1].destination, origin])
  } else {
    return null
  }
  
  return getMultipleTripTime(path)
  .then(travelTimes => {
    return travelTimes.map((travelTime, index) => {
      let start_travel
      if (index < travelTimes.length - 1) {
        start_travel = moment(today[index].start_time).subtract(travelTime.time, 's').format()
      } else {
        start_travel = (today.reverse())[0].end_time
      }
      return ({...travelTime, start_travel})
    })
  })
}

const test6AM = moment("2020-10-29T06")

const getRelativeSchedule = (tripTimes) => {
  return tripTimes.map(travelTimes => {
    return {
      hours_from_now: moment(travelTimes.start_travel).diff(moment(), 'h'),
      start_point : travelTimes.start_point
    }
  })
}

const weatherConditions = ({temp, humidity, weather, rain, uvi, wind_speed, visibility}) => {
  if (!temp) return [null];
  const result = [qualifyTemp(temp), qualifyHumidity(humidity)]
  if (uvi) result.push(qualifyUVI(uvi));
  if (weather.rainy) result.push("rainy");
  if (wind_speed >= 20) result.push("windy");
  if (wind_speed >= 20 && temp < 15) result.push("cold_wind");
  if (visibility < 100) result.push("low_visib");
  if (checkWetGround(rain)) result.push("wet_ground");
  return result;
}

const qualifyTemp = (temp) => {
    if (temp > 25) return "hot";
    if (temp < 25 && temp >= 18) return "warm";
    if (temp < 18 && temp >= 10) return "temperate";
    if (temp < 10 && temp >= 0) return "cool";
    if (temp < 0 && temp >= -10) return "cold";
    if (temp < -10) return "very cold";
}

const qualifyHumidity = (humidity) => {
  if (humidity > 60) return "humid";
  if (humidity < 60 && humidity >= 40) return "moderate";
  if (humidity < 40) return "dry";
}

const qualifyUVI = (uvi) => {
  if (uvi < 3) return "uv_low";
  if (uvi < 6 && uvi >= 3) return "uv_moderate";
  if (uvi > 6) return "uv_heavy";
}



const checkWetGround = (rain) => {
  if (rain) {
    return (rain['1h'] > 2.5);
  } else {
    return false;
  }
}

const conditionsOfDay = (conditions) => {
    const bulkCond = conditions.map(condition =>{
      return weatherConditions(condition);
    })
    const upcomingCond = bulkCond.shift();
    const filteredCond = [];
    bulkCond.forEach(events => {
      events.forEach(condition => {
        if (!filteredCond.includes(condition) && !upcomingCond.includes(condition)) {
          filteredCond.push(condition);
        }
      })
    })
    return [upcomingCond, filteredCond]
}

const getNowConditions = (location) => {
  return getWeather(location)
  .then(conditions => {
    return weatherConditions(conditions.current)
  })
}


module.exports = {
  createEventList,
  checkReocsToday,
  getNextEventFromRec,
  getTodayRecStartTime,
  getTripsToday,
  updateTodayToNow,
  getRelativeSchedule,
  conditionsOfDay,
  formatEntryForFrontEnd,
  getNowConditions,
  formatTimeForDb
};
