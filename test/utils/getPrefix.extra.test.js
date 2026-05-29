import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getPrefix, browserPrefixToKey, browserPrefixToStyle } from '../../lib/utils/getPrefix';

describe('getPrefix - additional edge cases', () => {
  describe('browserPrefixToKey edge cases', () => {
    it('handles a single-character property', () => {
      expect(browserPrefixToKey('x', 'Webkit')).toBe('WebkitX');
    });

    it('handles trailing hyphen gracefully', () => {
      // 'a-' -> capitalize 'A', hyphen sets shouldCapitalize but no following char
      expect(browserPrefixToKey('a-', 'Moz')).toBe('MozA');
    });

    it('emits a leading hyphen literally (no preceding char to capitalize)', () => {
      // i=0 starts with shouldCapitalize=true, so the leading '-' is emitted
      // as-is and the flag is consumed; the rest is appended verbatim.
      expect(browserPrefixToKey('-webkit', 'Moz')).toBe('Moz-webkit');
    });
  });

  describe('browserPrefixToStyle edge cases', () => {
    it('lowercases multi-letter prefixes', () => {
      expect(browserPrefixToStyle('user-select', 'Webkit')).toBe('-webkit-user-select');
    });

    it('returns the prop untouched for an empty prefix', () => {
      expect(browserPrefixToStyle('user-select', '')).toBe('user-select');
    });
  });

  describe('getPrefix - ms / O prefixes and partial chains', () => {
    let originalWindow;
    beforeEach(() => {
      originalWindow = global.window;
    });
    afterEach(() => {
      global.window = originalWindow;
    });

    it('detects the ms prefix', () => {
      global.window = {
        document: { documentElement: { style: { msTransform: '' } } },
      };
      expect(getPrefix('transform')).toBe('ms');
    });

    it('detects the O prefix', () => {
      global.window = {
        document: { documentElement: { style: { OTransform: '' } } },
      };
      expect(getPrefix('transform')).toBe('O');
    });

    it('returns empty string when documentElement itself is missing', () => {
      global.window = { document: {} };
      expect(getPrefix('transform')).toBe('');
    });

    it('returns empty string when document is missing entirely', () => {
      global.window = {};
      expect(getPrefix('transform')).toBe('');
    });

    it('detects prefixes for a kebab-cased property', () => {
      global.window = {
        document: { documentElement: { style: { WebkitUserSelect: '' } } },
      };
      expect(getPrefix('user-select')).toBe('Webkit');
    });
  });
});
