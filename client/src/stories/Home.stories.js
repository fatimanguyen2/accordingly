import React from 'react';

import { Home } from '../components/Home';

export default {
  title: 'Home',
  component: Home,
};

const Template = (args) => <Home {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  exampleProp: false,
};