import { vi } from 'vitest';
import '@testing-library/dom';

// Mock requestAnimationFrame for consistent test behavior
global.requestAnimationFrame = vi.fn((callback) => {
  callback();
  return 0;
});

global.cancelAnimationFrame = vi.fn();

// Reset body margin like old tests did
const styleEl = document.createElement('style');
styleEl.textContent = 'body { margin: 0; }';
document.head.appendChild(styleEl);
