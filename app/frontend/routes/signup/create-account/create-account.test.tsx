import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateAccount } from './create-account';

describe('CreateAccount', () => {
  test('renders form with username, password, and submit button', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Check if the form elements are rendered correctly
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Create Account');

    // Use toBeTruthy to check if elements exist in the DOM
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  test('does not show password strength message when password is empty', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Enter an empty value for the password input field
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: '' } });

    // Check if the password strength message is not displayed
    const passwordStrengthMessage = screen.queryByText('Password should have at least one letter and one number');
    expect(passwordStrengthMessage).toBeNull();
  });
});