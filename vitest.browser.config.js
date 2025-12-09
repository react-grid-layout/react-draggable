import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/browser/**/*.test.js'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
