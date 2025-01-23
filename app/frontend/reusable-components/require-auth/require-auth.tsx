import React , {useContext}from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

interface RequireAuthProps {
  children?: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/create-account" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};