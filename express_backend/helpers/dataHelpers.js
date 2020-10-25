
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

const computeWeekly = (reoc, day) => {
  
}

const computeReocs = (reocs, day) => {

  return reocs.filter((reoc) => {

    switch (reoc.type_of) {
      case 'daily':
        return true;
      case 'weekly':
        return computeWeekly(reoc);
      case 'monthly':
        return computeMonthly(reoc);
      case 'yearly':
        return computeYearly(reoc);
    }
  })
}

const install = [{type_of: 'daily'}, {type_of: 'weekly'}]

console.log(computeReocs(install))

module.exports = {
  getPostsByUsers,
  computeReocs,
};
