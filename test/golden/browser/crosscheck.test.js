import {afterAll, beforeAll, describe, expect, test} from 'vitest';
import {createServer} from 'vite';
import {mkdtemp, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {scenarios, browserScenarioNames} from '../scenarios/cases';
import {observableTrace} from '../recorder';
import {loadPlaywright} from './playwright';

const projectRoot = fileURLToPath(new URL('../../../', import.meta.url));
const buttonNames = ['left', 'middle', 'right'];
let server;
let browser;
let baseURL;

// Browser mouse input creates a native text selection even on a plain div.
// jsdom dispatch has no default click action. All other observable fields stay.
const normalizeTransform = value => typeof value === 'string' ?
  value.replace(/\s*,\s*/g, ',') : value;

function comparableTrace(trace) {
  return observableTrace(trace).map(step => {
    if (step.kind !== 'snapshot') return step;
    const {selection: _selection, ...snapshot} = step;
    return {
      ...snapshot,
      dom: snapshot.dom.map(node => ({
        ...node,
        styleTransform: normalizeTransform(node.styleTransform),
        translate: normalizeTransform(node.translate),
        svgTransformAttr: normalizeTransform(node.svgTransformAttr),
      })),
    };
  });
}

let cacheDir;

beforeAll(async () => {
  cacheDir = await mkdtemp(path.join(tmpdir(), 'react-draggable-golden-vite-'));
  server = await createServer({
    configFile: false,
    root: projectRoot,
    cacheDir,
    logLevel: 'error',
    server: {host: '127.0.0.1', port: 0, hmr: false},
    optimizeDeps: {include: ['react', 'react-dom', 'react-dom/client']},
  });
  await server.listen();
  baseURL = server.resolvedUrls.local[0];
  const {chromium} = loadPlaywright();
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {
      executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
    } : {}),
  });
});

afterAll(async () => {
  try {
    await browser?.close();
  } finally {
    try {
      await server?.close();
    } finally {
      if (cacheDir) await rm(cacheDir, {recursive: true, force: true});
    }
  }
});

async function driveMouse(page, events) {
  let pointer = {x: 0, y: 0};
  let controlDown = false;
  for (const input of events) {
    if (!['mousedown', 'mousemove', 'mouseup'].includes(input.type)) {
      throw new Error(`Real mouse cross-check cannot execute ${input.type}.`);
    }
    const nextControl = Boolean(input.ctrlKey);
    if (nextControl !== controlDown) {
      await page.keyboard[nextControl ? 'down' : 'up']('Control');
      controlDown = nextControl;
    }
    await page.evaluate(event => window.goldenBrowser.prepareInput(event), input);
    const x = input.x ?? 0;
    const y = input.y ?? 0;
    if (input.type === 'mousemove') {
      await page.mouse.move(x, y);
    } else {
      // Repositioning during a live drag would inject an extra mousemove.
      if (pointer.x !== x || pointer.y !== y) {
        if (input.type !== 'mousedown') {
          throw new Error('Cross-check mouseup must use the preceding move coordinates.');
        }
        await page.mouse.move(x, y);
      }
      const button = buttonNames[input.button ?? 0];
      if (!button) throw new Error(`Unsupported mouse button ${input.button}.`);
      await page.mouse[input.type === 'mousedown' ? 'down' : 'up']({button});
    }
    pointer = {x, y};
    // Each command is its own browser task; wait for React and scheduled cleanup.
    await page.evaluate(label => window.goldenBrowser.snapshot(label), input.type);
  }
}

describe('real mouse input agrees with checked-in jsdom goldens', () => {
  test.each(browserScenarioNames)('%s', async name => {
    const scenario = scenarios.find(item => item.name === name);
    expect(scenario, `Missing selected scenario ${name}`).toBeDefined();
    expect(scenario.cadence).toBe('per-event');
    const goldenPath = path.join(projectRoot, 'test/golden/__golden__', `${name}.golden.json`);
    const golden = JSON.parse(await readFile(goldenPath, 'utf8'));
    expect(golden.name).toBe(name);
    const context = await browser.newContext({viewport: {width: 1200, height: 900}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin === new URL(baseURL).origin ? route.continue() : route.abort();
    });
    try {
      await page.goto(`${baseURL}test/golden/browser/index.html`);
      await page.waitForFunction(() => Boolean(window.goldenBrowser));
      await page.evaluate(scenarioName => window.goldenBrowser.mount(scenarioName), name);
      await driveMouse(page, scenario.events);
      const actual = await page.evaluate(() => window.goldenBrowser.unmount());
      expect(errors).toEqual([]);
      expect(comparableTrace(actual)).toEqual(comparableTrace(golden.steps));
    } finally {
      await context.close();
    }
  });
});
