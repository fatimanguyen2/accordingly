const request = require('request');

const getPostsByUsers = (usersPosts) => {
  const postsByUsers = {};

  for (let post of usersPosts) {
    if (!postsByUsers[post.user_id]) {
      postsByUsers[post.user_id] = {
        userId: post.user_id,
        firstName: post.first_name,
        lastName: post.last_name,
        email: post.email,
        posts: [],
      };
    }

    postsByUsers[post.user_id].posts.push({
      title: post.title,
      content: post.content,
    });

  }

  return Object.values(postsByUsers);
};

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

// MAPQUEST developerAPI
// Key = 	AiWSvQStB39c9CB4ftDVnYgHANMxQbEx

const locationToAddress = (location) => {
  request(`http://www.mapquestapi.com/geocoding/v1/reverse?key=AiWSvQStB39c9CB4ftDVnYgHANMxQbEx&location=${location.x},${location.y}`, function (error, response, body) {
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




module.exports = {
  getPostsByUsers,
  getEventOfDay,
  locationToAddress
};
