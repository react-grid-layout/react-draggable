import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Vite/esbuild handles .ts/.tsx natively; @vitejs/plugin-react adds JSX +
  // Fast Refresh. No Babel/Flow transform is needed anymore.
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['test/browser/**'],
    // Suppress error stack traces from expected test failures
    onConsoleLog: () => false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**/*.{ts,tsx}'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },
  },
});
