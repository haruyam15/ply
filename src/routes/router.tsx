import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Like from '@/pages/Like';
import Playlist from '@/pages/Playlist';
import Profile from '@/pages/Profile';
import Timeline from '@/pages/Timeline';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/timeline',
        element: <Timeline />,
      },
      {
        path: '/playlist',
        element: <Playlist />,
      },
      {
        path: '/like',
        element: <Like />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
