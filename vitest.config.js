import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Process all .js and .jsx files through Babel
      include: [/\.[jt]sx?$/],
      babel: {
        presets: ['@babel/preset-flow', '@babel/preset-react'],
        plugins: ['@babel/plugin-transform-flow-comments'],
      },
    }),
  ],
  // Disable esbuild for JS files - let Babel handle them
  esbuild: false,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.{js,jsx}'],
    exclude: ['test/browser/**'],
    // Suppress error stack traces from expected test failures
    onConsoleLog: () => false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**/*.js'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },
  },
});
