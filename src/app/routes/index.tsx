import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '@/app/layout/Layout.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import HomePage from '@/pages/Home/HomePage.tsx';
import AuthPage from '@/pages/Auth/AuthPage.tsx';
import UsersPage from '@/pages/Users/UsersPage.tsx';
import PostsPage from '@/pages/Posts/PostsPage.tsx';
import ProfilePage from '@/pages/Profile/ProfilePage.tsx';
import PostsAdditionalInformation from '@/pages/Posts/PostsAdditionalInformation.tsx';

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
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'posts/:id',
        element: <PostsAdditionalInformation />,
      },
    ],
  },
]);

export default routes;
