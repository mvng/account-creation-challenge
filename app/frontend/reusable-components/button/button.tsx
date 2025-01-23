import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  loading?: boolean; // Add a loading prop
}

const classes = 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] font-medium text-white rounded-md w-full';

export function Button({ href, children, type, loading }: Props) {
  const buttonContent = loading ? (
    <div className="flex justify-center items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M4 12a8 8 0 0116 0"
        ></path>
      </svg>
      <span>Processing...</span>
    </div>
  ) : (
    children
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={loading}>
      {buttonContent}
    </button>
  );
}