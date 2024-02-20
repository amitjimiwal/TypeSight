import {render} from '@testing-library/react';
import React from 'react';
import App from '../src/App';

test('jest running', () => {
  render(<App />);
  expect(true).toBe(true)
});