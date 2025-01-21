import React, { useState } from 'react';
import WealthfrontLogo from '../../../../assets/images/wealthfront_logo.tsx';
import { Input } from 'app/frontend/reusable-components/input/input.tsx';
import { Button } from 'app/frontend/reusable-components/button/button.tsx';
import { Card } from 'app/frontend/reusable-components/card/card.tsx';
import './create-account.css';

export function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Account created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to create the account.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while creating the account.');
    }
  };


  return (
    <div className='mx-auto px-6 py-14 max-w-xl'>
      <Card>
        <div className="flex items-center justify-center mb-5">
          <WealthfrontLogo />
        </div>
        <h1 className="text-center text-3xl font-extrabold mb-6">Create New Account</h1>
        <form onSubmit={handleSubmit}>
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Create Account</Button>
        </form>
        {message && <p className="message">{message}</p>}
      </Card>
    </div>
  );
}
