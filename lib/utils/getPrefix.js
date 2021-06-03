// @flow
const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
export function getPrefix(prop: string='transform'): string {
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return '';

  // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.
  const style = window.document?.documentElement?.style;
  if (!style) return '';

  if (prop in style) return '';

  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

export function browserPrefixToKey(prop: string, prefix: string): string {
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
}

export function browserPrefixToStyle(prop: string, prefix: string): string {
  return prefix ? `-${prefix.toLowerCase()}-${prop}` : prop;
}

function kebabToTitleCase(str: string): string {
  let out = '';
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
export default (getPrefix(): string);
