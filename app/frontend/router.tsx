import React from 'react';

// Route Components
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';
import { CreateAccount } from './routes/signup/create-account/create-account.tsx';

// Auth/Routing Components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { RequireAuth } from './reusable-components/require-auth/require-auth.tsx';
import { Outlet } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  {
    path: '/signup/*',
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    // Outlet is placeholder for rendering children of protected routes
    children: [
      {
        path: 'account-selection',
        element: <AccountSelection />,
      },
      {
        path: 'create-user',
        element: <CreateUser />,
      },
      {
        path: 'joint-access',
        element: <JointAccess />,
      },
      {
        path: 'stock-restrictions',
        element: <StockRestrictions />,
      },
      {
        path: 'deposit',
        element: <Deposit />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
]);

export function Router() {
  return (
    <AuthProvider>
      <main className="h-screen w-screen bg-slate-50">
        <div className="h-full w-full max-w-[1200px] my-0 mx-auto">
          <RouterProvider router={router} />
        </div>
      </main>
    </AuthProvider>
  );
}
