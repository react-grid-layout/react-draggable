export default (function() {
  if (typeof window === 'undefined') return '';
  // Thanks David Walsh
  let styles = window.getComputedStyle(document.documentElement, ''),
  pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
  // 'ms' is not titlecased
  if (pre === 'ms') return pre;
  if (pre === undefined || pre === null) return '';
  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
})();
