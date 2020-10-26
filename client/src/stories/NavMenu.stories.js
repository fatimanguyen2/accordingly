import React from 'react';

import { NavMenu } from '../components/NavMenu';

export default {
  title: 'Nav Menu',
  component: NavMenu,
};

const Template = (args) => <NavMenu {...args} />;

export const Collapsed = Template.bind({});
Collapsed.args = {
  primary: true,
  label: 'Button',
};