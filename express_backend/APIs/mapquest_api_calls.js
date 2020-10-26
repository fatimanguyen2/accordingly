const request = require('request');

// MAPQUEST developerAPI
const host = "http://www.mapquestapi.com/"
const key = "AiWSvQStB39c9CB4ftDVnYgHANMxQbEx"
// Currently unused
const locationToAddress = (location) => {
  request(`${host}geocoding/v1/reverse?key=${key}&location=${location.x},${location.y}`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body).results[0].locations[0])
      const { street, adminAera5, adminAera3, adminAera1, postalCode } = (JSON.parse(body).results[0].locations[0])
      return {
        street,
        city: adminAera5,
        state: adminAera3,
        country: adminAera1,
        postalcode: postalCode
      }
    }
  })
}

const getTrip = ({from, to, wayOfTrans = 'pedestrian'} ) => {
  request(`${host}directions/v2/route?key=${key}&from=${from.x},${from.y}&to=from=${to.x},${to.y}&routetype=${wayOfTrans}`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body))
      return {
        
      }
    }
  })
}


module.exports = {
  locationToAddress,
  getTrip
};