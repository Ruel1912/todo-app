import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';

  return {
    plugins: [react()],
    ...(isTest && {
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
      },
    }),
  };
});
