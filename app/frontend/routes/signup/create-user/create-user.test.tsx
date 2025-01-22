import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateUser } from './create-user';

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

describe('CreateUser', () => {
  test('render', () => {});
  (fetch as jest.Mock).mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
  render(<CreateUser />, { wrapper: BrowserRouter });
  const first = screen.getByLabelText('First name');
  const last = screen.getByLabelText('Last name');

  expect(first).toBeTruthy()
  expect(last).toBeTruthy()

});
