import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Follow from '@/pages/Follow';
import Home from '@/pages/Home';
import Like from '@/pages/Like';
import Playlist from '@/pages/Playlist';
import Profile from '@/pages/Profile';
import Search from '@/pages/Search';
import Timeline from '@/pages/Timeline';
import Watch from '@/pages/Watch';

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
      {
        path: '/watch',
        element: <Watch />,
      },
      {
        path: '/follow',
        element: <Follow />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]);
