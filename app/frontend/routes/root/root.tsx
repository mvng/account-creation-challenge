import React from 'react';
import { Link } from 'react-router-dom';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';

export function Root() {
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
