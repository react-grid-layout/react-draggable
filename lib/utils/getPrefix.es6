// @flow
const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
export function getPrefix(prop: string='transform'): string {
  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  const style = window.document.documentElement.style;

  if (prop in style) return '';

  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToStyle(prop, prefixes[i]) in style) return prefixes[i];
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
export default getPrefix();
