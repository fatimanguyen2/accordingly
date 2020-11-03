import { faBolt, faCloud, faSun, faMoon, faCloudShowersHeavy, faSnowflake, faCloudRain, faQuestion } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const getItem = (id, array) => array.find(element => element.id === id);

const getSuggestionCategory = (id, object) => {
  for (const category in object) {
    const result = object[category].find(item => item.id === id);
    if (result) {
      return category
    };
  }
};

const getRecurrenceArray = (event, list) => {
  for (const rec of list.repeating) {
    if (event.entry === rec.entry) {
      return rec.recurrences;
    }
  }
}

const getEvent = (scheduleType, id, evtObj) => {
  if (scheduleType === 'repeating') {
    return evtObj[scheduleType].find(event => event.entry_id === id);
  } else {
    return evtObj[scheduleType].find(event => event.id === id);
  }
};

const filterEvents = (scheduleType, id, evtObj) => evtObj[scheduleType].filter(event => event.entry_id !== id);

const getWeatherIcon = (start, weather) => {
  const startTime= moment(start).unix();
  const icons = {
    Thunderstorm: faBolt,
    Drizzle: faCloudRain,
    Rain: faCloudShowersHeavy,
    Snow: faSnowflake,
    Clear: faSun,
    Clouds: faCloud,
    null: faQuestion
  };

  if (weather) {
    const isNightTime = startTime < weather.sunrise || startTime > weather.sunset;

    if (weather.mainWeather[0] === 'Clear' && isNightTime) {
      return faMoon;
    } else {
      return icons[weather.mainWeather[0]] || icons.null;
    }

  } else {
    return icons[weather];
  }
};
// const getWeatherIcon = weather => {
//   const icons = {
//     Thunderstorm: faBolt,
//     Drizzle: faCloudRain,
//     Rain: faCloudShowersHeavy,
//     Snow: faSnowflake,
//     Clear: faSun,
//     Clouds: faCloud,
//     null: faQuestion
//   };
//   return icons[weather];
// };

const getWeatherColor = (start, weather) => {
  const startTime= moment(start).unix();
  const icons = {
    Thunderstorm: 'rgb(151, 118, 223)',
    Drizzle: '#0FB2F9',
    Rain: '#0FB2F9',
    Snow: 'white',
    Clear: 'rgb(255,223,109)',
    Clouds: 'rgb(184, 184, 184)',
    null: 'white'
  };

  if (weather) {
    const isNightTime = startTime < weather.sunrise || startTime > weather.sunset;

    if (weather.mainWeather[0] === 'Clear' && isNightTime) {
      return ' #357AFF';
    } else {
      return icons[weather.mainWeather[0]] || 'white';
    }
  } else {
    return 'white';
  }
};

// const getWeatherColor = weather => {
//   const icons = {
//     Thunderstorm: 'rgb(151, 118, 223)',
//     Drizzle: '#0FB2F9',
//     Rain: '#0FB2F9',
//     Snow: 'white',
//     Clear: 'rgb(255,223,109)',
//     Clouds: 'rgb(184, 184, 184)',
//     null: 'white'
//   };
//   return icons[weather];
// };

const changeWeatherName = (start, weather) => {
  const startTime= moment(start).unix();
  const names = {
    Rain: 'Rainy',
    Snow: 'Snowy',
    Clear: 'Sunny',
    Clouds: 'Cloudy'
  }

  // If weather is not null
  if (weather) {
    const isNightTime = startTime < weather.sunrise || startTime > weather.sunset;
    if (weather.mainWeather[0] === 'Clear' && isNightTime) {
      return 'Clear';
    } else {
      return names[weather.mainWeather[0]] || weather.mainWeather[0];
    }
  } else {
    return weather;
  }
};

// const changeWeatherClassname = weather => {
//   const names = {
//     Rain: 'Rainy',
//     Snow: 'Snowy',
//     Clear: 'Sunny',
//     Clouds: 'Cloudy'
//   }
//   return names[weather] || weather;
// };

const setPrimaryColors = weather => {
  const now = moment();
  const isNightTime = now < weather.sunrise || now > weather.sunset;
  const colors = {
    Thunderstorm: { solid: 'rgb(151, 118, 223)', gradient: 'rgba(175,145,239, 0.6)' },
    Drizzle: { solid: 'rgb(34,155,206)', gradient: 'rgba(34,155,206, 0.8)' },
    Rain: { solid: 'rgb(34,155,206)', gradient: 'rgba(34,155,206, 0.8)' },
    Snow: { solid: 'white', gradient: 'rgb(177, 218, 255)' },
    Clear: { solid: 'rgb(255,223,109)', gradient: 'rgba(255,223,109,0.8)' },
    Clouds: { solid: 'rgb(184, 184, 184)', gradient: 'rgba(169, 208, 236, 0.726)' },
    default: { solid: 'white', gradient: 'white' }
  }

  if (weather.mainWeather[0] === 'Clear' && isNightTime) {
    return { solid: '#356DFF', gradient: 'rgba(0,71, 255, 0.8)' }
  } else {
    return (colors[weather.mainWeather[0]] && { solid: colors[weather.mainWeather[0]].solid, gradient: colors[weather.mainWeather[0]].gradient }) || colors.default;
  }

}

const getDateFromTimestamp = date => {
  return date.slice(0, 10);
}

const giveHTMLID = (recurrences) => {
  return recurrences.map((ele, index) => ({ ...ele, html_id: index }));
};

const validateObj = (eventObj, checks) => {
  return checks.reduce((acc, name) => (eventObj[name] !== '' && acc), true);
};

const addSeconds = (hour) => {
  return hour + ':00';
};

const removeSeconds = (hour = '') => {
  return hour.slice(0, 5);
};

const getHourFromTime = (time = '') => {
  return time.slice(11, 19);
};


// const setPrimaryColors = weather => {
//   const colors = {
//     Thunderstorm: {solid: 'rgb(151, 118, 223)', gradient: 'rgba(175,145,239, 0.6)'},
//     Drizzle: {solid: 'rgb(34,155,206)', gradient: 'rgba(34,155,206, 0.8)'},
//     Rain: {solid: 'rgb(34,155,206)', gradient: 'rgba(34,155,206, 0.8)'},
//     Snow: {solid: 'white', gradient: 'rgb(177, 218, 255)'},
//     Clear: {solid: 'rgb(255,223,109)', gradient: 'rgba(255,223,109,0.8)'},
//     Clouds: {solid: 'rgb(184, 184, 184)', gradient: 'rgba(169, 208, 236, 0.726)'},
//     default: {solid: 'white', gradient: 'white'}
//   }

//   return (colors[weather] && {solid: colors[weather].solid, gradient: colors[weather].gradient} )|| colors.default;
// };

const roundUp = (momentObj, roundBy) => {
  return momentObj.add(1, roundBy).startOf(roundBy);
}

export {
  getItem,
  getSuggestionCategory,
  getRecurrenceArray,
  getEvent,
  filterEvents,
  getWeatherIcon,
  getWeatherColor,
  changeWeatherName,
  // changeWeatherClassname,
  setPrimaryColors,
  getDateFromTimestamp,
  giveHTMLID,
  validateObj,
  addSeconds,
  removeSeconds,
  getHourFromTime,
  roundUp
};