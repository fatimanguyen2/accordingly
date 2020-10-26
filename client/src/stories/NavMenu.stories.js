import React from 'react';

import { NavMenu } from '../components/NavMenu';

export default {
  title: 'Nav Menu',
  component: NavMenu,
};

const Template = (args) => <NavMenu {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: true,
};