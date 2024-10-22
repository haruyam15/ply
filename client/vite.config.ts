import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects', // _redirects 파일 경로
          dest: '', // dist 폴더에 복사
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  assetsInclude: ['**/*.woff', '**/*.woff2'],
});
