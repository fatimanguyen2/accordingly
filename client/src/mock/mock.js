const fakeEvents = {
  "today": [
      {
          "entry": "Singing in the Rain",
          "id": 11,
          "destination": {
              "x": 49.2297911,
              "y": -123.108002
          },
          "address": "6080, Manitoba St",
          "city": "Vancouver",
          "postal_code": "null",
          "is_outdoor": null,
          "start_date": "2020-11-05T05:00:00.000Z",
          "start_hour": "23:05:00",
          "end_hour": "23:59:00",
          "entry_id": 17,
          "type_of": "weekly",
          "initial": "2020-11-03T05:00:00.000Z",
          "interval": 1,
          "recurrence_id": 6,
          "start_time": "2020-11-03T23:05:00-04:00",
          "end_time": "2020-11-03T23:00:00-04:00",
          "leave_by": "2020-11-03T22:32:45-04:00",
          "weather": {
              "mainWeather": ["Rain"],
              "sunset": 1604450849,
              "sunrise": 1604415868
          }
      },
      {
          "entry": "AC/DC Concert",
          "id": 9,
          "destination": {
              "x": 41.8669892,
              "y": -87.6245727
          },
          "address": "1212, S Michigan Ave",
          "city": "Chicago",
          "postal_code": "null",
          "is_outdoor": null,
          "start_time": "2020-11-05T20:56:00-05:00",
          "end_time": "2020-11-05T21:16:00-05:00",
          "entry_id": 14,
          "leave_by": "2020-10-05T20:44:29-04:00",
          "weather": {
              "mainWeather": ["Thunderstorm"],
              "sunset": 1604443325,
              "sunrise": 1604406356
          }
      }
  ],
  "repeating": [
      {
          "entry": "Friday Afternoon Hikes",
          "entry_id": 30,
          "start_date": "2020-11-04T05:00:00.000Z",
          "start_hour": "13:05:00",
          "end_hour": "16:00:00",
          "next_event": {
              "address": "6080, Manitoba St",
              "city": "Vancouver",
              "start_time": "2020-11-06T13:00:00", //1604667600
              "end_time": "2020-11-06T16:00:00",
              "destination": {
                  "x": 49.2297911,
                  "y": -123.108002
              },
              "weather": {
                  "mainWeather": ["Clear"],
                  "sunset": 1604687600,
                  "sunrise": 1604637600
              }
          },
          "recurrences": [
              {
                  "id": 10,
                  "type_of": "weekly",
                  "initial": "2020-11-02T05:00:00.000Z",
                  "interval": 1
              },
              {
                  "id": 11,
                  "type_of": "weekly",
                  "initial": "2020-11-03T05:00:00.000Z",
                  "interval": 1
              },
              {
                  "id": 12,
                  "type_of": "weekly",
                  "initial": "2020-11-04T05:00:00.000Z",
                  "interval": 1
              },
              {
                  "id": 13,
                  "type_of": "weekly",
                  "initial": "2020-11-05T05:00:00.000Z",
                  "interval": 1
              },
              {
                  "id": 14,
                  "type_of": "weekly",
                  "initial": "2020-11-06T05:00:00.000Z",
                  "interval": 1
              }
          ]
      },
      {
        "entry": "Helping Mom",
        "entry_id": 17,
        "start_date": "2020-11-04T05:00:00.000Z",
        "start_hour": "13:05:00",
        "end_hour": "16:00:00",
        "next_event": {
            "address": "6080, Manitoba St",
            "city": "Vancouver",
            "start_time": "2020-11-06T13:05:00",
            "end_time": "2020-11-06T16:00:00",
            "destination": {
                "x": 49.2297911,
                "y": -123.108002
            },
            "weather": {
                "mainWeather": ["Clouds"],
                "sunset": 1604450849,
                "sunrise": 1604415868
            }
        },
        "recurrences": [
            {
                "id": 10,
                "type_of": "weekly",
                "initial": "2020-11-02T05:00:00.000Z",
                "interval": 1
            },
            {
                "id": 11,
                "type_of": "weekly",
                "initial": "2020-11-03T05:00:00.000Z",
                "interval": 1
            },
            {
                "id": 12,
                "type_of": "weekly",
                "initial": "2020-11-04T05:00:00.000Z",
                "interval": 1
            },
            {
                "id": 13,
                "type_of": "weekly",
                "initial": "2020-11-05T05:00:00.000Z",
                "interval": 1
            },
            {
                "id": 14,
                "type_of": "weekly",
                "initial": "2020-11-06T05:00:00.000Z",
                "interval": 1
            }
        ]
    }
  ],
  "future": [
      {
          "entry": "Date Night",
          "id": 12,
          "destination": {
              "x": 49.2595859,
              "y": -123.1008425
          },
          "address": "2838, Main St",
          "city": "Vancouver",
          "postal_code": "null",
          "is_outdoor": null,
          "start_time": "2020-11-11T22:00:00-05:00",
          "end_time": "2020-11-11T22:30:00-05:00",
          "entry_id": 18,
          "weather": {
              "mainWeather": ["Clear"],
              "sunset": 1604450842,
              "sunrise": 1604415870
          }
      },
      {
          "entry": "Winter is Coming",
          "id": 6,
          "destination": {
              "x": 49.38754,
              "y": -123.14254
          },
          "address": "1567 Townline Rd",
          "city": "Abbotsford",
          "postal_code": "V2T 6E1",
          "is_outdoor": false,
          "start_time": "2020-11-12T09:00:00-05:00",
          "end_time": "2020-11-12T18:00:00-05:00",
          "entry_id": 11,
          "weather": {
            "mainWeather": ["Snow"],
            "sunset": 1604450842,
            "sunrise": 1604415870
        }
      }
  ]
}

const fakeRecommendations = {
    "upcoming": [
        {
            "id": 9,
            "name": "Light gloves",
            "description": "Keep your hand covered in cool and cold weather conditions."
        },
        {
            "id": 6,
            "name": "Extra Layers",
            "description": "Layering up on clothing is recommended as the temperature drops."
        },
        {
            "id": 27,
            "name": "Jacket",
            "description": "Cooler weather warrants putting on a jacket."
        },
        {
            "id": 22,
            "name": "Face Mask",
            "description": "Do not forget to bring a mask when leaving the house."
        }
    ],
    "later": [
        {
            "id": 4,
            "name": "Long Sleeves Top",
            "description": "Colder days require more coverage."
        },
        {
            "id": 26,
            "name": "Normal Clothing",
            "description": "It is not too hot nor too warm."
        },
        {
            "id": 100,
            "name": "Bike Helmet",
            "description": "It is dangerous to go alone."
        },
        {
            "id": 101,
            "name": "Sunglasses",
            "description": "It's dangerous to go alone."
        },
        {
            "id": 102,
            "name": "Sunscreen",
            "description": "It's dangerous to go alone."
        },        
        {
            "id": 104,
            "name": "Sunscreen",
            "description": "It's dangerous to go alone."
        },
        {
            "id": 103,
            "name": "Towel",
            "description": "Always bring a towel'."
        },
    ]
}

module.exports = { 
  fakeEvents,
  fakeRecommendations
}