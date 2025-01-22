import React from 'react';
import { Link } from 'react-router-dom';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { Landing } from '../landing/landing.tsx';
export function Root() {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Landing />;
  }

  return (
    <FlowLayout>
      <div className="flex justify-center items-center h-screen">
        <Link
          to="/signup/account-selection"
          className="inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] font-medium text-white rounded-md w-full transition max-w-md"
        >
          Get started
        </Link>
      </div>
    </FlowLayout>
  );
}
