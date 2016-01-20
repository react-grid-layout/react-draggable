// PhantomJS STILL doesn't support bind yet
/*eslint no-extend-native:0*/
Function.prototype.bind = Function.prototype.bind || function (thisp) {
  var fn = this;
  return function () {
    return fn.apply(thisp, arguments);
  };
};

require('./draggable.spec.jsx');
