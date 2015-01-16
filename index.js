
var fs = require('fs');
var path = require('path');

module.exports = function() {};

module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable();
  var cb = this.async();

  var templatePath = __dirname + '/lib/template.js';
  this.addDependency(templatePath);

  var resource = this.resourcePath;
  var ext = path.extname(resource);
  var name = path.basename(resource, ext)
  var dirname = path.dirname(resource);

  var req = remainingRequest.split('!');
  req.pop();

  var loadingComponent = dirname + '/' + name + '.loading' + ext;
  var LOADING = fs.existsSync(loadingComponent) ?
        'loading = require(' + JSON.stringify('!!' + req.join('!') + '!' + loadingComponent) + '),\n' +
        'loading = loading["default"] || loading':
        '';

  if (LOADING) this.addDependency(loadingComponent);

  fs.readFile(templatePath, 'utf8', function(err, template) {
    if (err) return cb(err);

    cb(null,
       template
         .replace(/__REQUEST__/g, JSON.stringify('!!' + remainingRequest))
         .replace(/__PROXY__/g, JSON.stringify(require.resolve('./lib/lazy-load.js')))
         .replace(/__LOADING_COMPONENT__/g, LOADING)
    );
  });
};
