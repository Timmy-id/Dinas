import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster.jsx';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignUpForm from './pages/auth/Signup.jsx';
import SignInForm from './pages/auth/Signin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MenuList from './pages/menus/MenuList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <SignUpForm />,
      },
      {
        path: '/login',
        element: <SignInForm />,
      },
      {
        path: '/menus',
        element: <MenuList />,
      },
      {
        path: '/orders',
        element: <div>Orders</div>,
      },
      {
        path: '/tables',
        element: <div>Tables</div>,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '*',
        element: <Navigate to='/login' replace />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
