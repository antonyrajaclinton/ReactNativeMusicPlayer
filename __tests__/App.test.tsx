/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App_backup';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
