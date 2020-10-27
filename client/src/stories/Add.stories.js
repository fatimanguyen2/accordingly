import React from 'react';
import { action } from '@storybook/addon-actions';

import { AddEvent } from '../components/Nav/AddEvent';

export default {
  title: 'Add Menu',
  component: AddEvent,
};

const Template = (args) => <AddEvent {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  onSubmit: action(`submit`)
};