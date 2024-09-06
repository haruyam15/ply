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
import ManagePlaylist from '@/pages/ManagePlaylist';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import Loading from '@/pages/loading'; // Loading 컴포넌트 추가

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
        path: '/loading', // 로딩 경로 추가
        element: <Loading />,
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
        path: '/playlist',
        element: (
          <ProtectedRoutes>
            <Playlist />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/like',
        element: (
          <ProtectedRoutes>
            <Like />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/profile',
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
        path: '/follow',
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
