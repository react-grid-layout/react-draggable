import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export function loadPlaywright() {
  const modulePath = process.env.PLAYWRIGHT_MODULE_PATH || 'playwright';
  try {
    return require(modulePath);
  } catch (error) {
    throw new Error(
      'Playwright is unavailable. Use the local dependency or set ' +
      'PLAYWRIGHT_MODULE_PATH to an existing offline playwright package. ' +
      'This runner never downloads dependencies or browsers.',
      { cause: error },
    );
  }
}
