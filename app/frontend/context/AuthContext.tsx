import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn: authStatus, isLoading } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoggedIn: authStatus, isLoading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

