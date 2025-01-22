import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/check_session', {
        credentials: 'include'
      });
      const data = await response.json();
      
      setAuthState({
        isLoggedIn: data.logged_in,
        user: data.user || null,
        isLoading: false
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return authState;
}