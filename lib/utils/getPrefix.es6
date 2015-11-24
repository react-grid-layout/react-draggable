export default (function() {
  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  // Thanks David Walsh
  let styles = window.getComputedStyle(document.documentElement, ''),
  pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
  // 'ms' is not titlecased
  if(pre === undefined || pre === null) return '';
  if (pre === 'ms') return pre;
  if (pre === undefined || pre === null) return '';
  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
})();
