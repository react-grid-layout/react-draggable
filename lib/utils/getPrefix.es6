// @flow
export function generatePrefix(): string {
  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
  const style = window.document.documentElement.style;

  if ('transform' in style) {
    return '';
  }

  for (let i = 0; i < prefixes.length; ++i) {
    if (prefixes[i] + 'Transform' in style) {
      return prefixes[i];
    }
  }
  return '';
}

export default generatePrefix();
