import React from 'react';
import { action } from '@storybook/addon-actions';

import { Add } from '../components/Nav/add';

export default {
  title: 'Add Menu',
  component: Add,
};

const Template = (args) => <Add {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  onSubmit: action(`submit`)
};