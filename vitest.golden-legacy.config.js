import {defineConfig} from 'vitest/config';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';

// A separate project keeps the main React 19 suite on its installed runtime.
const requestedRoot = process.env.REACT18_MODULE_ROOT;
if (!requestedRoot) {
  throw new Error('Set REACT18_MODULE_ROOT to an existing node_modules directory containing matching react@18 and react-dom@18. This optional project never installs dependencies.');
}
const runtime = path.resolve(requestedRoot);
const packageVersion = name => JSON.parse(readFileSync(path.join(runtime, name, 'package.json'), 'utf8')).version;
let reactVersion;
let domVersion;
let domReactVersion;
try {
  reactVersion = packageVersion('react');
  domVersion = packageVersion('react-dom');
  // ReactDOM uses native require internally, so its adjacent React must match too.
  domReactVersion = createRequire(path.join(runtime, 'react-dom/package.json'))('react').version;
} catch (cause) {
  throw new Error('REACT18_MODULE_ROOT must contain an existing React 18 / ReactDOM 18 runtime with its dependencies.', {cause});
}
if (!reactVersion.startsWith('18.') || domVersion !== reactVersion || domReactVersion !== reactVersion) {
  throw new Error(`REACT18_MODULE_ROOT requires matching React 18 packages; found react=${reactVersion}, react-dom=${domVersion}, ReactDOM dependency=${domReactVersion}.`);
}

export default defineConfig({
  resolve: {
    alias: [
      {find: /^react$/, replacement: path.join(runtime, 'react/index.js')},
      {find: /^react\/jsx-runtime$/, replacement: path.join(runtime, 'react/jsx-runtime.js')},
      {find: /^react\/jsx-dev-runtime$/, replacement: path.join(runtime, 'react/jsx-dev-runtime.js')},
      {find: /^react-dom$/, replacement: path.join(runtime, 'react-dom/index.js')},
      {find: /^react-dom\/client$/, replacement: path.join(runtime, 'react-dom/client.js')},
      {find: /^react-dom\/test-utils$/, replacement: path.join(runtime, 'react-dom/test-utils.js')},
    ],
  },
  test: {
    environment: 'jsdom',
    include: ['test/golden/legacy/**/*.test.jsx'],
    fileParallelism: false,
    maxWorkers: 1,
    server: {deps: {inline: [/react/, /react-dom/]}},
  },
});
