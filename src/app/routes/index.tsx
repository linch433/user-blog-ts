import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '@/app/layout/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import HomePage from '@/pages/Home/HomePage.tsx';
import AuthPage from '@/pages/Auth/AuthPage.tsx';
import UsersPage from '@/pages/Users/UsersPage.tsx';
import PostsPage from '@/pages/Posts/PostsPage.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
    ],
  },
]);

export default routes;
