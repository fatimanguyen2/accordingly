const axios = require('axios');

// MAPQUEST developerAPI
const host = "http://www.mapquestapi.com/"
const key = "AiWSvQStB39c9CB4ftDVnYgHANMxQbEx"



const locationToAddress = (location) => {
   return axios.get(`${host}geocoding/v1/reverse?key=${key}&location=${location.x},${location.y}`)
    .then(response => {
      console.log(response.data.results[0].locations[0])
      const { street, adminArea5, adminArea3, adminArea1, postalCode } = response.data.results[0].locations[0]
      return {
        street,
        city: adminArea5,
        state: adminArea3,
        country: adminArea1,
        postalcode: postalCode
      }
  })
  .catch(err => err)
}


const getTrip = ({from, to, traveMode = 'pedestrian'} ) => {
  request(`${host}directions/v2/route?key=${key}&from=${from}&to=from=${to}&routetype=${traveMode}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`${host}directions/v2/pathfromroute?key=${key}&from=${from.x},${from.y}&to=from=${to.x},${to.y}&routetype=${wayOfTrans}`)
      console.log(JSON.parse(body))
      return {
        
      }
    } else {
    }
    
  })
}


module.exports = {
  locationToAddress,
  getTrip
};