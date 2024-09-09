import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Follow from '@/pages/Follow';
import Home from '@/pages/Home';
import Like from '@/pages/Like';
import Playlist from '@/pages/Playlist';
import Profile from '@/pages/Profile';
import Search from '@/pages/Search';
import SearchPage from '@/pages/SearchPage';
import Timeline from '@/pages/Timeline';
import Watch from '@/pages/Watch';
import ManagePlaylist from '@/pages/ManagePlaylist';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

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
        element: (
          <ProtectedRoutes>
            <Timeline />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/playlist/:userIdParams?',
        element: (
          <ProtectedRoutes>
            <Playlist />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/like/:userId?',
        element: (
          <ProtectedRoutes>
            <Like />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/profile/:userId',
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/watch/:playlistId',
        element: (
          <ProtectedRoutes>
            <Watch />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/follow/:userId',
        element: (
          <ProtectedRoutes>
            <Follow />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/search-results',
        element: <SearchPage />,
      },
      {
        path: '/managePlaylist/:playlistId?',
        element: (
          <ProtectedRoutes>
            <ManagePlaylist />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
