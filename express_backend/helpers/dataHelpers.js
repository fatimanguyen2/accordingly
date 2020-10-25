const moment = require('moment');

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
  const fromInitial =  moment().week() - moment(reoc.initial).week()
  return (moment(reoc.initial).day() === moment().day() && fromInitial % reoc.interval === 0)
};

const computeMonthly = (reoc, day) => {
  const fromInitial =  moment().month() - moment(reoc.initial).month()
  return (moment(reoc.initial).date() === moment().date() && fromInitial % reoc.interval === 0)
};

const computeYearly = (reoc, day) => {
  const fromInitial =  moment().year() - moment(reoc.initial).year()
  return (moment(reoc.initial).dayOfYear() === moment().dayOfYear() && fromInitial % reoc.interval === 0)
};

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

module.exports = {
  getPostsByUsers,
  computeReocs,
};
