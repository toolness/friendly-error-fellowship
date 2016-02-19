---
# We are going to use Jekyll to concatenate all the parts of this
# experimental library, to keep things at least a little bit modular.
# For more information, see: http://stackoverflow.com/a/4307177/2422398
---

(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define('p5.friendly-debugger', ['p5'], function (p5) { (factory(p5));});
  else if (typeof exports === 'object')
    factory(require('../p5'));
  else
    factory(root['p5']);
}(this, function (p5) {
  if (typeof(Proxy) === 'undefined') {
    console.log('ES6 Proxy support not found, disabling friendly debugger.');
    return;
  }

  {% include vendor/almond.js %}

  define('p5', [], function() { return p5; });
  define('docs', [], function() { return {% include_relative data.json %}; });

  {% include_relative _log-with-css.js %}
  {% include_relative _friendly-welcome.js %}
  {% include_relative _check-arguments.js %}
  {% include_relative _proxify.js %}

  var friendlyWelcome = require('./friendly-welcome');
  var proxify = require('./proxify');

  // Expose for testing.
  p5._friendlyDebuggerRequire = require;

  friendlyWelcome();
  proxify();
}));
