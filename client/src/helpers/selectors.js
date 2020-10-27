const getItem = (id, array) => array.find(element => element.id === id);

const getSuggestionCategory = (id, object) => {
  for (const category in object) {
    const result = object[category].find(item => item.id === id);
    if (result) {
      return category
    };
  }
};

export { getItem, getSuggestionCategory };