import React from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4">
        <Link
          to="/login"
          className="inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] font-medium text-white rounded-md w-full"
        >
          Login
        </Link>
        <Link
          to="/create-account"
          className="inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] font-medium text-white rounded-md w-full transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
