import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPrefix, browserPrefixToKey, browserPrefixToStyle } from '../../lib/utils/getPrefix';

describe('getPrefix utilities', () => {
  describe('browserPrefixToKey', () => {
    it('should return prop unchanged when no prefix', () => {
      expect(browserPrefixToKey('transform', '')).toBe('transform');
    });

    it('should prefix and capitalize for Webkit', () => {
      expect(browserPrefixToKey('transform', 'Webkit')).toBe('WebkitTransform');
    });

    it('should prefix and capitalize for Moz', () => {
      expect(browserPrefixToKey('transform', 'Moz')).toBe('MozTransform');
    });

    it('should handle kebab-case properties', () => {
      expect(browserPrefixToKey('user-select', 'Webkit')).toBe('WebkitUserSelect');
    });

    it('should handle multi-hyphen properties', () => {
      expect(browserPrefixToKey('border-top-left-radius', 'Webkit')).toBe('WebkitBorderTopLeftRadius');
    });
  });

  describe('browserPrefixToStyle', () => {
    it('should return prop unchanged when no prefix', () => {
      expect(browserPrefixToStyle('transform', '')).toBe('transform');
    });

    it('should add CSS prefix for Webkit', () => {
      expect(browserPrefixToStyle('transform', 'Webkit')).toBe('-webkit-transform');
    });

    it('should add CSS prefix for Moz', () => {
      expect(browserPrefixToStyle('transform', 'Moz')).toBe('-moz-transform');
    });

    it('should add CSS prefix for ms', () => {
      expect(browserPrefixToStyle('transform', 'ms')).toBe('-ms-transform');
    });
  });

  describe('getPrefix', () => {
    let originalWindow;

    beforeEach(() => {
      originalWindow = global.window;
    });

    afterEach(() => {
      global.window = originalWindow;
    });

    it('should return empty string when window is undefined', () => {
      global.window = undefined;
      expect(getPrefix('transform')).toBe('');
    });

    it('should return empty string when documentElement.style is unavailable', () => {
      global.window = { document: {} };
      expect(getPrefix('transform')).toBe('');
    });

    it('should return empty string when prop exists unprefixed', () => {
      global.window = {
        document: {
          documentElement: {
            style: { transform: '' }
          }
        }
      };
      expect(getPrefix('transform')).toBe('');
    });

    it('should return Webkit prefix when WebkitTransform exists', () => {
      global.window = {
        document: {
          documentElement: {
            style: { WebkitTransform: '' }
          }
        }
      };
      expect(getPrefix('transform')).toBe('Webkit');
    });

    it('should return Moz prefix when MozTransform exists', () => {
      global.window = {
        document: {
          documentElement: {
            style: { MozTransform: '' }
          }
        }
      };
      expect(getPrefix('transform')).toBe('Moz');
    });

    it('should return empty string when no prefix matches', () => {
      global.window = {
        document: {
          documentElement: {
            style: {}
          }
        }
      };
      expect(getPrefix('someUnknownProperty')).toBe('');
    });

    it('should use transform as default prop', () => {
      global.window = {
        document: {
          documentElement: {
            style: { transform: '' }
          }
        }
      };
      expect(getPrefix()).toBe('');
    });
  });
});
