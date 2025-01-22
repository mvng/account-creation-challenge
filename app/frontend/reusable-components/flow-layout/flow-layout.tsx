import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const { user } = useAuth();

  return (
    <div className="h-full pt-3 max-w-[1000px] mx-auto">
      <div className="w-full flex justify-between pb-4 pt-2">
        <div>{user && user.username && <h2>{`Welcome, ${user.username}`}</h2>}</div>
        <div>
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
