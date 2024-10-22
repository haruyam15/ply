import './styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Global } from '@emotion/react';

import { router } from '@/routes/router';
import fontStyles from '@/styles/fonts';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Global styles={fontStyles} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
