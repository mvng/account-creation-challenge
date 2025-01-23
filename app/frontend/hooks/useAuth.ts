import { useState, useEffect } from 'react';
import { api } from '../services/api'

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
      const response = await api('/api/check_session','GET');
      
      setAuthState({
        isLoggedIn: response.logged_in,
        user: response.user || null,
        isLoading: false
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return authState;
}