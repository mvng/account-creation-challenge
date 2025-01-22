import React, { useState, useEffect } from 'react';
import WealthfrontLogo from '../../../../assets/images/wealthfront_logo.tsx';
import { Input } from '../../../reusable-components/input/input.tsx'
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { api } from '../../../services/api.ts';

const hasLetterRegex = /[A-Za-z]/; // At least one letter
const hasNumberRegex = /\d/; // At least one numberconst 

const MIN_PASSWORD_LENGTH = 20;
const MIN_USERNAME_LENGTH = 10;
const MAX_INPUT_LENGTH = 50;

export function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [debouncedPassword, setDebouncedPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  // adds some delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPassword(password);
    }, 150);

    return () => clearTimeout(timer);
  }, [password]);

  // Handle password strength validation when debouncedPassword changes
  useEffect(() => {
    const validatePassword = async () => {
      if (!debouncedPassword) {
        setPasswordStrength('');
        setIsPasswordValid(false);
        return;
      }

      // Simple validators before checking server-side
      if (debouncedPassword.length < MIN_PASSWORD_LENGTH) {
        setPasswordStrength(`Password should be at least ${MIN_PASSWORD_LENGTH} characters`);
        setIsPasswordValid(false);
        return;
      }

      if (debouncedPassword.length > MAX_INPUT_LENGTH) {
        setPasswordStrength(`Password should be less than ${MAX_INPUT_LENGTH} characters`);
        setIsPasswordValid(false);
        return;
      }

      // Better messaging when deciding on password
      if (!hasLetterRegex.test(debouncedPassword) && !hasNumberRegex.test(debouncedPassword)) {
        setPasswordStrength('Password should have at least one letter and one number');
        setIsPasswordValid(false);
        return;
      } else if (!hasLetterRegex.test(debouncedPassword)) {
        setPasswordStrength('Password should have at least one letter');
        setIsPasswordValid(false);
        return;
      } else if (!hasNumberRegex.test(debouncedPassword)) {
        setPasswordStrength('Password should have at least one number');
        setIsPasswordValid(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append('password', debouncedPassword);

        const response = await api('/api/password-strength', 'POST', formData);
        const strengthMessages = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
        const score = response.score;

        setPasswordStrength(`Password Strength is ${strengthMessages[score]}` || 'Unknown');
        setIsPasswordValid(score >= 3); // imitating backend scoring system
      } catch (err) {
        console.error('Error checking password strength:', err);
        setPasswordStrength('Error calculating strength');
        setIsPasswordValid(false);
      }
    };

    validatePassword();
  }, [debouncedPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!isPasswordValid) {
      return
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await api('/api/create-account', 'POST', formData);
      if (response.success) {
        window.location.href = '/';
        console.log('Account created', response);
      } else {
        setMessage('Failed to create the account.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while creating the account.');
    }
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
          />
          <Input
            label="Password"
            type="password"
            value={password}
            minLength={MIN_PASSWORD_LENGTH}
            maxLength={MAX_INPUT_LENGTH}
            onChange={(e) => setPassword(e.target.value)}
          >
            {passwordStrength && (
              <p className={`text-xs -mt-2 mb-4 ${isPasswordValid ? 'text-green-500' : 'text-red-500'}`}>
                {passwordStrength}
              </p>
            )}
          </Input>

          <Button type="submit">Create Account</Button>
        </form>
        {message && <p className="message">{message}</p>}
      </Card>
    </div>
  );
}
