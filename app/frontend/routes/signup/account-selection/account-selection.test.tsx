import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountSelection } from './account-selection';
global.fetch = jest.fn();
const mockResponse = {
  logged_in: true,
  user: {
    id: 73,
    username: "sdf23847ey9rhfsdkjfsdhfjh",
    password: "fdkjsh9s8dfuhkjfsdhkk",
    created_at: "2025-01-22T08:47:13.403Z",
    updated_at: "2025-01-22T08:47:13.403Z",
  }
};
describe('AccountSelection', () => {
  (fetch as jest.Mock).mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  test('render', () => {});
  render(<AccountSelection />, { wrapper: BrowserRouter });
  const cash = screen.getByText('I want to open a cash account.');
  const investing = screen.getByText('I want to open an investing account.');
  
  expect(cash).toBeTruthy();
  expect(investing).toBeTruthy();
});
