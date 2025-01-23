import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateAccount } from './create-account';
import { api } from '../../../services/api';

jest.mock('../../../services/api');

describe('CreateAccount', () => {
  test('renders form with username, password, and submit button', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    const usernameInput = document.getElementById('Username');
    const passwordInput = document.getElementById('Password');
    const submitButton = screen.getByText('Create Account');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test('password field receives a value', async () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
    expect(passwordField).toBeInstanceOf(HTMLInputElement);

    fireEvent.change(passwordField, { target: { value: '@password123' } });

    expect(passwordField.value).toBe('@password123');

    const passwordFieldMessage = await screen.findByText('Password should be at least 20 characters');
    expect(passwordFieldMessage).toBeTruthy();
  });

  it('simulates a successful form submission', async () => {
    // const assignMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    });

    // Mock the API call to return responses for both password strength and account creation
    jest
      .mocked(api)
      .mockResolvedValueOnce({ score: 3 }) // Mock response for password strength API
      .mockResolvedValueOnce({ success: true }); // Mock response for account creation API

    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Fill in the username field
    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'validusername' } });

    // Fill in the password field
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'SecurePassword1234567890' } });

    // Wait for the password strength validation
    await waitFor(() => {
      expect(api).toHaveBeenCalledWith(
        '/api/password-strength',
        'POST',
        expect.any(FormData) // Expect a FormData object
      );

      const passwordStrengthMessage = screen.getByText('Password Strength is Strong');
      expect(passwordStrengthMessage).toBeTruthy();
    });

    // Submit the form
    const submitButton = screen.getByText('Create Account');
    fireEvent.click(submitButton);

    // Wait for the form submission
    await waitFor(() => {
      expect(api).toHaveBeenCalledWith(
        '/api/create-account',
        'POST',
        expect.any(FormData) // Expect a FormData object
      );
    });
  });
});
