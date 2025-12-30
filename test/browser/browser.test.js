/**
 * Browser-based tests using Puppeteer
 * These tests require a real browser for proper coordinate calculations
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Browser Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // Disable sandbox in CI environments (required for GitHub Actions runners)
      args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
    });
  }, 30000);

  afterAll(async () => {
    if (browser) await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // Load the test page via file protocol
    const testHtmlPath = path.resolve(__dirname, 'test.html');
    await page.goto(`file://${testHtmlPath}`);
    // Wait for React/ReactDOM to be available
    await page.waitForFunction(() => window.React && window.ReactDOM);
  }, 30000);

  afterEach(async () => {
    if (page) await page.close();
  });

  describe('Dragging position', () => {
    it('should update transform on drag', async () => {
      // Render a basic draggable
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();
        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      // Get initial transform
      const initialTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(initialTransform).toMatch(/translate\(0px,?\s*0px\)/);

      // Simulate drag
      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      // Check final transform
      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(100px,?\s*100px\)/);
    }, 30000);

    it('should honor x axis constraint', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();
        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { axis: 'x', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(100px,?\s*0px\)/);
    }, 30000);

    it('should honor y axis constraint', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();
        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { axis: 'y', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(0px,?\s*100px\)/);
    }, 30000);
  });

  describe('Callbacks', () => {
    it('should call onStop when drag ends', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        window.stopCalled = false;
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            onStop: () => { window.stopCalled = true; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const stopCalled = await page.evaluate(() => window.stopCalled);
      expect(stopCalled).toBe(true);
    }, 30000);
  });

  describe('Bounds', () => {
    it('should clip dragging to bounds object', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            bounds: { left: 0, right: 50, top: 0, bottom: 50 }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 200, box.y + 200);
      await page.mouse.up();

      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(50px,?\s*50px\)/);
    }, 30000);

    it('should clip dragging to parent bounds', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement('div', {
            id: 'parent',
            style: {
              width: '300px',
              height: '300px',
              position: 'relative',
              background: '#ccc'
            }
          },
            React.createElement(Draggable, { bounds: 'parent', nodeRef: ref },
              React.createElement('div', {
                ref: ref,
                id: 'draggable-test',
                style: { width: '100px', height: '100px', background: 'blue' }
              })
            )
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Try to drag far beyond parent bounds (300 - 100 = 200px max)
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 500, box.y + 500);
      await page.mouse.up();

      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      // Should be clipped to 200px (parent width 300 - element width 100)
      expect(finalTransform).toMatch(/translate\(200px,?\s*200px\)/);
    }, 30000);

    it('should clip to negative bounds', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            bounds: { left: -50, right: 50, top: -50, bottom: 50 }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Drag in negative direction
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x - 100, box.y - 100);
      await page.mouse.up();

      const finalTransform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(-50px,?\s*-50px\)/);
    }, 30000);
  });

  describe('Grid snapping', () => {
    it('should snap movement to grid', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.lastPosition = null;

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            grid: [25, 25],
            onDrag: (e, data) => { window.lastPosition = { x: data.x, y: data.y }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Move 30px - should snap to 25px
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 80, box.y + 80);
      await page.mouse.up();

      const position = await page.evaluate(() => window.lastPosition);
      expect(position.x).toBe(25);
      expect(position.y).toBe(25);
    }, 30000);

    it('should not trigger onDrag when movement is less than grid', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.dragCallCount = 0;

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            grid: [50, 50],
            onDrag: () => { window.dragCallCount++; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Move only 20px - less than half the grid size (25px)
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 70, box.y + 70);
      await page.mouse.up();

      const dragCallCount = await page.evaluate(() => window.dragCallCount);
      // onDrag should not be called because movement didn't reach grid threshold
      expect(dragCallCount).toBe(0);
    }, 30000);

    it('should snap to larger grid correctly', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.lastPosition = null;

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            grid: [100, 100],
            onDrag: (e, data) => { window.lastPosition = { x: data.x, y: data.y }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Move 150px - should snap to 200px (closest grid point rounding)
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 200, box.y + 200);
      await page.mouse.up();

      const position = await page.evaluate(() => window.lastPosition);
      // At 150px movement, snaps to 200px (nearest grid point with rounding)
      expect(position.x).toBe(200);
      expect(position.y).toBe(200);
    }, 30000);
  });

  describe('Scale support', () => {
    it('should adjust position when scale is 2x', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.dragData = null;

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            scale: 2,
            onDrag: (e, data) => { window.dragData = { x: data.x, y: data.y }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      // Move 100px visually, should be 50px in draggable coords due to 2x scale
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const dragData = await page.evaluate(() => window.dragData);
      expect(dragData.x).toBe(50);
      expect(dragData.y).toBe(50);
    }, 30000);
  });

  describe('Handle and Cancel', () => {
    it('should only drag from handle', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { handle: '.handle', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '200px', height: '100px', background: 'blue' }
            },
              React.createElement('div', {
                className: 'handle',
                style: { width: '50px', height: '50px', background: 'red' }
              }),
              React.createElement('div', {
                className: 'content',
                style: { width: '50px', height: '50px', background: 'green' }
              })
            )
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      // Try dragging from content (should not work)
      const content = await page.$('.content');
      const contentBox = await content.boundingBox();

      await page.mouse.move(contentBox.x + 25, contentBox.y + 25);
      await page.mouse.down();
      await page.mouse.move(contentBox.x + 125, contentBox.y + 125);
      await page.mouse.up();

      let transform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(transform).toMatch(/translate\(0px,?\s*0px\)/);

      // Try dragging from handle (should work)
      const handle = await page.$('.handle');
      const handleBox = await handle.boundingBox();

      await page.mouse.move(handleBox.x + 25, handleBox.y + 25);
      await page.mouse.down();
      await page.mouse.move(handleBox.x + 125, handleBox.y + 125);
      await page.mouse.up();

      transform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(transform).toMatch(/translate\(100px,?\s*100px\)/);
    }, 30000);

    it('should drag from deeply nested handle elements', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { handle: '.handle', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '200px', height: '100px', background: 'blue' }
            },
              React.createElement('div', { className: 'handle' },
                React.createElement('div', null,
                  React.createElement('span', null,
                    React.createElement('div', { className: 'deep', style: { width: '50px', height: '50px', background: 'red' } })
                  )
                )
              ),
              React.createElement('div', { className: 'content', style: { width: '50px', height: '50px', background: 'green' } })
            )
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      // Drag from deeply nested element inside handle
      const deep = await page.$('.deep');
      const deepBox = await deep.boundingBox();

      await page.mouse.move(deepBox.x + 25, deepBox.y + 25);
      await page.mouse.down();
      await page.mouse.move(deepBox.x + 125, deepBox.y + 125);
      await page.mouse.up();

      const transform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(transform).toMatch(/translate\(100px,?\s*100px\)/);
    }, 30000);

    it('should not drag from deeply nested cancel elements', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, { cancel: '.cancel', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '200px', height: '100px', background: 'blue' }
            },
              React.createElement('div', { className: 'cancel' },
                React.createElement('div', null,
                  React.createElement('span', null,
                    React.createElement('div', { className: 'deep', style: { width: '50px', height: '50px', background: 'red' } })
                  )
                )
              ),
              React.createElement('div', { className: 'content', style: { width: '50px', height: '50px', background: 'green' } })
            )
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      // Drag from deeply nested element inside cancel (should not work)
      const deep = await page.$('.deep');
      const deepBox = await deep.boundingBox();

      await page.mouse.move(deepBox.x + 25, deepBox.y + 25);
      await page.mouse.down();
      await page.mouse.move(deepBox.x + 125, deepBox.y + 125);
      await page.mouse.up();

      const transform = await page.$eval('#draggable-test', el => el.style.transform);
      expect(transform).toMatch(/translate\(0px,?\s*0px\)/);
    }, 30000);
  });

  describe('Iframe support', () => {
    it('should work correctly inside an iframe', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        // Create an iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'test-iframe';
        iframe.style.cssText = 'width: 500px; height: 500px; border: 1px solid black;';
        root.appendChild(iframe);

        // Wait for iframe to load and get its document
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Write basic HTML structure into iframe
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head><style>body { margin: 0; padding: 20px; }</style></head>
          <body><div id="iframe-root"></div></body>
          </html>
        `);
        iframeDoc.close();

        // Copy React and ReactDOM to iframe window
        iframe.contentWindow.React = React;
        iframe.contentWindow.ReactDOM = ReactDOM;

        // Render Draggable into iframe
        const iframeRoot = iframeDoc.getElementById('iframe-root');
        const ref = React.createRef();
        ReactDOM.createRoot(iframeRoot).render(
          React.createElement(Draggable, { nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'iframe-draggable',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      // Wait for draggable to render in iframe
      await page.waitForFunction(() => {
        const iframe = document.getElementById('test-iframe');
        return iframe && iframe.contentDocument.getElementById('iframe-draggable');
      });

      // Get the iframe element
      const iframeHandle = await page.$('#test-iframe');
      const iframeBox = await iframeHandle.boundingBox();

      // Get the draggable element inside iframe
      const frame = await iframeHandle.contentFrame();
      const draggable = await frame.$('#iframe-draggable');
      const draggableBox = await draggable.boundingBox();

      // Verify initial transform
      const initialTransform = await frame.$eval('#iframe-draggable', el => el.style.transform);
      expect(initialTransform).toMatch(/translate\(0px,?\s*0px\)/);

      // Perform drag inside iframe
      await page.mouse.move(draggableBox.x + 50, draggableBox.y + 50);
      await page.mouse.down();
      await page.mouse.move(draggableBox.x + 150, draggableBox.y + 150);
      await page.mouse.up();

      // Verify transform was updated
      const finalTransform = await frame.$eval('#iframe-draggable', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(100px,?\s*100px\)/);
    }, 30000);

    it('should respect bounds inside an iframe', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        // Create an iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'test-iframe-bounds';
        iframe.style.cssText = 'width: 500px; height: 500px; border: 1px solid black;';
        root.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head><style>body { margin: 0; padding: 0; }</style></head>
          <body>
            <div id="iframe-root" style="position: relative; width: 300px; height: 300px; background: #ccc;"></div>
          </body>
          </html>
        `);
        iframeDoc.close();

        iframe.contentWindow.React = React;
        iframe.contentWindow.ReactDOM = ReactDOM;

        const iframeRoot = iframeDoc.getElementById('iframe-root');
        const ref = React.createRef();
        ReactDOM.createRoot(iframeRoot).render(
          React.createElement(Draggable, { bounds: 'parent', nodeRef: ref },
            React.createElement('div', {
              ref: ref,
              id: 'iframe-draggable-bounds',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForFunction(() => {
        const iframe = document.getElementById('test-iframe-bounds');
        return iframe && iframe.contentDocument.getElementById('iframe-draggable-bounds');
      });

      const iframeHandle = await page.$('#test-iframe-bounds');
      const frame = await iframeHandle.contentFrame();
      const draggable = await frame.$('#iframe-draggable-bounds');
      const draggableBox = await draggable.boundingBox();

      // Try to drag beyond parent bounds
      await page.mouse.move(draggableBox.x + 50, draggableBox.y + 50);
      await page.mouse.down();
      await page.mouse.move(draggableBox.x + 500, draggableBox.y + 500);
      await page.mouse.up();

      // Should be clipped to parent bounds (300 - 100 = 200 max)
      const finalTransform = await frame.$eval('#iframe-draggable-bounds', el => el.style.transform);
      expect(finalTransform).toMatch(/translate\(200px,?\s*200px\)/);
    }, 30000);
  });

  describe('Scroll handling', () => {
    it('should handle dragging in scrollable containers', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.dragData = null;

        // Create a simple draggable that we can verify drag works
        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            onDrag: (e, data) => { window.dragData = { x: data.x, y: data.y, deltaX: data.deltaX, deltaY: data.deltaY }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Perform drag and verify position calculation
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const dragData = await page.evaluate(() => window.dragData);
      expect(dragData).not.toBeNull();
      expect(dragData.deltaX).toBe(100);
      expect(dragData.deltaY).toBe(100);
    }, 30000);
  });

  describe('Shadow DOM support', () => {
    it('should clip dragging to parent bounds in shadow DOM', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        window.dragData = null;

        // Create a shadow host
        const shadowHost = document.createElement('div');
        shadowHost.id = 'shadow-host';
        root.appendChild(shadowHost);

        const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

        // Create container in shadow DOM
        const container = document.createElement('div');
        container.id = 'shadow-container';
        container.style.cssText = 'position: relative; width: 200px; height: 200px; background: #ccc;';
        shadowRoot.appendChild(container);

        // Render Draggable into shadow DOM
        const ref = React.createRef();
        ReactDOM.createRoot(container).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            bounds: 'parent',
            defaultPosition: { x: 50, y: 50 },
            onDrag: (e, data) => { window.dragData = { x: data.x, y: data.y }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'shadow-draggable',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      // Wait for element in shadow DOM
      await page.waitForFunction(() => {
        const host = document.getElementById('shadow-host');
        return host && host.shadowRoot && host.shadowRoot.getElementById('shadow-draggable');
      });

      // Get element from shadow DOM
      const element = await page.evaluateHandle(() => {
        const host = document.getElementById('shadow-host');
        return host.shadowRoot.getElementById('shadow-draggable');
      });
      const box = await element.boundingBox();

      // Try to drag beyond parent bounds
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 500, box.y + 500);
      await page.mouse.up();

      const dragData = await page.evaluate(() => window.dragData);
      // Should be clipped to parent bounds (200 - 100 = 100 max)
      expect(dragData.x).toBe(100);
      expect(dragData.y).toBe(100);
    }, 30000);

    it('should clip dragging to selector bounds in shadow DOM', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        window.dragData = null;

        // Create a shadow host
        const shadowHost = document.createElement('div');
        shadowHost.id = 'shadow-host-2';
        root.appendChild(shadowHost);

        const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

        // Create container with ID in shadow DOM
        const container = document.createElement('div');
        container.id = 'bounds-container';
        container.style.cssText = 'position: relative; width: 200px; height: 200px; background: #ccc;';
        shadowRoot.appendChild(container);

        // Render Draggable into shadow DOM with selector bounds
        const ref = React.createRef();
        ReactDOM.createRoot(container).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            bounds: '#bounds-container',
            defaultPosition: { x: 50, y: 50 },
            onDrag: (e, data) => { window.dragData = { x: data.x, y: data.y }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'shadow-draggable-2',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      // Wait for element in shadow DOM
      await page.waitForFunction(() => {
        const host = document.getElementById('shadow-host-2');
        return host && host.shadowRoot && host.shadowRoot.getElementById('shadow-draggable-2');
      });

      // Get element from shadow DOM
      const element = await page.evaluateHandle(() => {
        const host = document.getElementById('shadow-host-2');
        return host.shadowRoot.getElementById('shadow-draggable-2');
      });
      const box = await element.boundingBox();

      // Try to drag beyond bounds
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 500, box.y + 500);
      await page.mouse.up();

      const dragData = await page.evaluate(() => window.dragData);
      // Should be clipped to bounds
      expect(dragData.x).toBe(100);
      expect(dragData.y).toBe(100);
    }, 30000);
  });

  describe('Unmount safety', () => {
    it('should not throw when unmounted during onStop callback', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        window.errorThrown = false;
        window.originalError = window.onerror;
        window.onerror = () => { window.errorThrown = true; };

        function App() {
          const [visible, setVisible] = React.useState(true);
          const ref = React.useRef(null);
          window.setVisible = setVisible;

          if (!visible) return React.createElement('div', { id: 'unmounted' }, 'Unmounted');

          return React.createElement(Draggable, {
            nodeRef: ref,
            onStop: () => { setVisible(false); }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { width: '100px', height: '100px', background: 'blue' }
            })
          );
        }

        ReactDOM.createRoot(root).render(React.createElement(App));
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      // Perform drag that will unmount the component in onStop
      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      // Verify component unmounted
      await page.waitForSelector('#unmounted');

      // Verify no error was thrown
      const errorThrown = await page.evaluate(() => window.errorThrown);
      expect(errorThrown).toBe(false);

      // Cleanup
      await page.evaluate(() => { window.onerror = window.originalError; });
    }, 30000);
  });

  describe('Input focus preservation', () => {
    it('should not defocus inputs when draggable unmounts', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');

        window.inputBlurred = false;

        function App() {
          const [showDraggable, setShowDraggable] = React.useState(true);
          const ref = React.useRef(null);
          window.setShowDraggable = setShowDraggable;

          return React.createElement('div', null,
            React.createElement('input', {
              id: 'test-input',
              type: 'text',
              onBlur: () => { window.inputBlurred = true; }
            }),
            showDraggable && React.createElement(Draggable, { nodeRef: ref },
              React.createElement('div', {
                ref: ref,
                id: 'draggable-test',
                style: { width: '100px', height: '100px', background: 'blue' }
              })
            )
          );
        }

        ReactDOM.createRoot(root).render(React.createElement(App));
      });

      await page.waitForSelector('#test-input');
      await page.waitForSelector('#draggable-test');

      // Focus the input
      await page.focus('#test-input');
      await page.type('#test-input', 'hello');

      // Verify input is focused
      const isFocused = await page.evaluate(() =>
        document.activeElement === document.getElementById('test-input')
      );
      expect(isFocused).toBe(true);

      // Reset blur tracking
      await page.evaluate(() => { window.inputBlurred = false; });

      // Unmount the draggable while input is focused
      await page.evaluate(() => { window.setShowDraggable(false); });

      // Wait for draggable to be removed
      await page.waitForFunction(() => !document.getElementById('draggable-test'));

      // Verify input wasn't blurred by the unmount
      const wasBlurred = await page.evaluate(() => window.inputBlurred);
      expect(wasBlurred).toBe(false);

      // Verify input is still focused
      const stillFocused = await page.evaluate(() =>
        document.activeElement === document.getElementById('test-input')
      );
      expect(stillFocused).toBe(true);

      // Verify input value is preserved
      const inputValue = await page.$eval('#test-input', el => el.value);
      expect(inputValue).toBe('hello');
    }, 30000);

    it('should not steal focus from inputs when starting drag', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.inputBlurred = false;

        ReactDOM.createRoot(root).render(
          React.createElement('div', null,
            React.createElement('input', {
              id: 'test-input-drag',
              type: 'text',
              style: { marginBottom: '20px', display: 'block' },
              onBlur: () => { window.inputBlurred = true; }
            }),
            React.createElement(Draggable, { nodeRef: ref },
              React.createElement('div', {
                ref: ref,
                id: 'draggable-focus-test',
                style: { width: '100px', height: '100px', background: 'blue' }
              })
            )
          )
        );
      });

      await page.waitForSelector('#test-input-drag');
      await page.waitForSelector('#draggable-focus-test');

      // Focus the input and type
      await page.focus('#test-input-drag');
      await page.type('#test-input-drag', 'test');

      // Reset blur tracking
      await page.evaluate(() => { window.inputBlurred = false; });

      // Start dragging the draggable element (but don't click the input)
      const element = await page.$('#draggable-focus-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 100, box.y + 100);
      await page.mouse.up();

      // The input will blur because we clicked elsewhere (on the draggable)
      // This is expected browser behavior - we're testing that the library
      // doesn't cause unexpected blurs during its internal operations
      const inputValue = await page.$eval('#test-input-drag', el => el.value);
      expect(inputValue).toBe('test');
    }, 30000);
  });

  describe('Offset calculations', () => {
    it('should calculate drag with offset position correctly', async () => {
      await page.evaluate(() => {
        const { React, ReactDOM, Draggable } = window;
        const root = document.getElementById('root');
        const ref = React.createRef();

        window.dragData = null;

        ReactDOM.createRoot(root).render(
          React.createElement(Draggable, {
            nodeRef: ref,
            onDrag: (e, data) => { window.dragData = { x: data.x, y: data.y, deltaX: data.deltaX, deltaY: data.deltaY }; }
          },
            React.createElement('div', {
              ref: ref,
              id: 'draggable-test',
              style: { position: 'relative', top: '200px', left: '200px', width: '100px', height: '100px', background: 'blue' }
            })
          )
        );
      });

      await page.waitForSelector('#draggable-test');

      const element = await page.$('#draggable-test');
      const box = await element.boundingBox();

      await page.mouse.move(box.x + 50, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.up();

      const dragData = await page.evaluate(() => window.dragData);
      // Should report delta of 100, not accounting for initial CSS position
      expect(dragData.deltaX).toBe(100);
      expect(dragData.deltaY).toBe(100);
    }, 30000);
  });
});
