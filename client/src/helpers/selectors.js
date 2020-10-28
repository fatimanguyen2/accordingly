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

export { getItem, getSuggestionCategory, getRecurrenceArray, getEvent };