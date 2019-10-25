// PhantomJS2 doesn't have Map
if (!global.Map) {
  require('core-js/es6/map');
}
if (!global.Set) {
  require('core-js/es6/set');
}

require('./draggable.spec.jsx');
