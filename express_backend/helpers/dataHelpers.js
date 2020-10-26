const getEventOfDay = (day) => {
  return day.map(event => {
    const { entry, start_time, end_time, destination } = event;
    return {
      entry,
      start_time,
      end_time,
      destination : destination
    }
  })
}

module.exports = {
  getEventOfDay,
};
