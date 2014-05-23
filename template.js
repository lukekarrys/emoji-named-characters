// universal module definition: https://github.com/umdjs/umd/blob/master/returnExports.js#L41
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.emoji = factory();
  }
}(this, function () {
    return "{{mapping}}";
}));
