import { defineConfig } from 'vitest/config';

// A separate Node runner controls Playwright. The page imports lib/ through Vite.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/golden/browser/**/*.test.js'],
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 15000,
    hookTimeout: 30000,
  },
});
