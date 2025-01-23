import React, { useState, useEffect } from 'react';

// Assets
import WealthfrontLogo from '../../../../assets/images/wealthfront_logo.tsx';

// Components
import { Input } from '../../../reusable-components/input/input.tsx';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';

// Utilities
import { api } from '../../../services/api.ts';
import { validatePasswordMessage } from '../../../utilities/validatePassword/';

// Constants
const MIN_PASSWORD_LENGTH = 20;
const MIN_USERNAME_LENGTH = 10;
const MAX_INPUT_LENGTH = 50;
const PASSWORD_STRENGTH_MESSAGES = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];

export function CreateAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState<string>('');
  const [debouncedPassword, setDebouncedPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  // adds some delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPassword(password);
    }, 300);

    return () => clearTimeout(timer);
  }, [password]);

  // Handle password strength validation when debouncedPassword changes
  useEffect(() => {
    const validatePassword = async () => {
      if (!debouncedPassword) {
        setPasswordStrengthMessage('');
        setIsPasswordValid(false);
        return;
      }

      if (validatePasswordMessage(debouncedPassword)) {
        setIsPasswordValid(false);
        setPasswordStrengthMessage(validatePasswordMessage(debouncedPassword));
        return;
      }

      try {
        const formData = new FormData();
        formData.append('password', debouncedPassword);

        const response = await api('/api/password-strength', 'POST', formData);
        const score = response.score;

        setPasswordStrengthMessage(`Password Strength is ${PASSWORD_STRENGTH_MESSAGES[score]}`);
        setIsPasswordValid(score >= 3); // imitating backend scoring system
      } catch (err) {
        console.error('Error checking password strength:', err);
        setPasswordStrengthMessage('Error calculating strength');
        setIsPasswordValid(false);
      }
    };

    validatePassword();
  }, [debouncedPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)

    if (!isPasswordValid) {
      return setIsLoading(false);
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await api('/api/create-account', 'POST', formData);
      if (response.success) {
        window.location.href = '/signup/account-selection';
      } else {
        setMessage('Failed to create the account.');
      }
    } catch (err) {
      setIsLoading(false)
      console.error(err);
      setMessage('An error occurred while creating the account.');
    }

    setIsLoading(false)
  };

  return (
    <div className="mx-auto px-6 py-14 max-w-xl">
      <Card>
        <div className="flex items-center justify-center mb-5">
          <WealthfrontLogo />
        </div>
        <h1 className="text-center text-3xl font-extrabold mb-6">Create New Account</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={MIN_USERNAME_LENGTH}
            maxLength={MAX_INPUT_LENGTH}
            required
            aria-required="true"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_INPUT_LENGTH}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            required
          >
            {passwordStrengthMessage && (
              <p
                id="password-strength-message"
                aria-describedby="password-strength-message"
                className={`text-xs -mt-2 mb-4 ${isPasswordValid ? 'text-green-500' : 'text-red-500'}`}
              >
                {passwordStrengthMessage}
              </p>
            )}
          </Input>
          <Button loading={isLoading}type="submit">Create Account</Button>
        </form>
        {message && <p className="message">{message}</p>}
      </Card>
    </div>
  );
}
