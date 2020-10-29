import {faBolt, faCloud, faSun, faCloudShowersHeavy, faSnowflake, faCloudRain, faQuestionCircle, faQuestion} from '@fortawesome/free-solid-svg-icons';

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

const filterEvents = (scheduleType, id, evtObj) => {
  if (scheduleType === 'repeating') {
    return evtObj[scheduleType].filter(event => event.entry_id !== id);
  } else {
    return evtObj[scheduleType].filter(event => event.id !== id);
  }
};

const getWeatherIcon = weather => {
  const icons = {
    Thunderstorm: faBolt,
    Drizzle: faCloudRain,
    Rain: faCloudShowersHeavy,
    Snow: faSnowflake,
    Clear: faSun,
    Clouds: faCloud,
    null: faQuestionCircle
  };
  return icons[weather];
};


export { getItem, getSuggestionCategory, getRecurrenceArray, getEvent, filterEvents, getWeatherIcon };