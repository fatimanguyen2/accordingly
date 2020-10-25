

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
      destination
    }
  })
}



module.exports = {
  getPostsByUsers,
  getEventOfDay
};
