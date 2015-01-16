var defaultName = 'default';
var component;

function fetch() {
  require.ensure([], function() {
    var mod = require(__REQUEST__);
    component = mod[defaultName] || component;
    exports.e.emit('c', component);
  });
}

var loading;
__LOADING_COMPONENT__
exports = module.exports = require(__PROXY__)({
  l: loading,
  g: function() {
    if (!component) fetch();
    return component;
  }
}, require('react'));
exports[defaultName] = exports;

if (module.hot) {
  module.hot.accept(__REQUEST__, fetch);
}
