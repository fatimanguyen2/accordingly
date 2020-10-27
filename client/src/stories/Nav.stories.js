import React from 'react';
import { action } from '@storybook/addon-actions';

import { Nav } from '../components/Nav';

export default {
  title: 'Nav Menu',
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: false,
  view: 'home',
  onSelect: action(`selected`),
  onSubmit: action(`submit`)
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
  view: 'home',
  onSelect: action(`selected`),
  onSubmit: action(`submit`)
};