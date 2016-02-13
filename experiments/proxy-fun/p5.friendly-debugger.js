(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define('p5.dom', ['p5'], function (p5) { (factory(p5));});
  else if (typeof exports === 'object')
    factory(require('../p5'));
  else
    factory(root['p5']);
}(this, function (p5) {
  if (typeof(Proxy) === 'undefined') {
    console.log('ES6 Proxy support not found, disabling friendly debugger.');
    return;
  }

  var P5_CLASS_RE = /^p5\.([^.]+)$/;
  var docs = getReferenceDocs();

  function createProxyForClassMethod(classitem, fn) {
    var showHelp = function() {
      var url = 'http://p5js.org/reference/#/' + classitem.class +
                '/' + classitem.name;

      console.log(
        classitem.name + "()\n\n" + classitem.description + "\n\n" +
        "For more information, see: " + url
      );
    };

    var handler = {
      apply: function(target, thisArg, argumentsList) {
        // TODO: Check arguments, provide feedback if needed.
        return target.apply(thisArg, argumentsList);
      },
      get: function(target, property) {
        if (property == 'bind')
          return function() {
            return buildProxy(target.bind.apply(target, arguments));
          };
        return target[property];
      }
    };

    var buildProxy = function(fn) {
      if (!fn.hasOwnProperty('help')) {
        Object.defineProperty(fn, 'help', {
          configurable: true,
          enumerable: true,
          get: showHelp
        });
      }
      return new Proxy(fn, handler);
    };

    return buildProxy(fn);
  }

  function createProxyForClassPrototype(className, classObj) {
    var proto = classObj.prototype;
    var classitemMap = {};
    var methodMap = {};

    docs.classitems.forEach(function(classitem) {
      // Note that we check for classitem.name because some methods
      // don't appear to define them... Filed this as
      // https://github.com/processing/p5.js/issues/1252.
      if (classitem.class === className && classitem.name) {
        if (classitemMap.hasOwnProperty(classitem.name)) {
          console.log("Duplicate definition for " + className + "." +
                      classitem.name, classitem);
        }
        classitemMap[classitem.name] = classitem;
      }
    });

    return new Proxy(proto, {
      get: function(target, name) {
        // TODO: Consider adding a 'did you mean?' message if name is
        // not in target, as per Ruby 2.3.

        if (name[0] === '_') return target[name];
        if (typeof(target[name]) === 'function' &&
            classitemMap.hasOwnProperty(name)) {
          if (!methodMap.hasOwnProperty(name)) {
            methodMap[name] = createProxyForClassMethod(
              classitemMap[name],
              target[name]
            );
          }
          return methodMap[name];
        }
        return target[name];
      }
    });
  }

  function getReferenceDocs() {
    var req = new XMLHttpRequest();

    // Load synchronously because this is just a prototype. Ideally we
    // would have a build system in place that bundled everything together.
    req.open('GET', 'data.json', false);
    req.send(null);
    return JSON.parse(req.responseText);
  }

  Object.keys(docs.classes).forEach(function(key) {
    if (key === 'p5') {
      p5.prototype = createProxyForClassPrototype('p5', p5);
    } else if (P5_CLASS_RE.test(key)) {
      var prop = key.match(P5_CLASS_RE)[1];

      if (typeof(p5[prop]) === 'function') {
        p5[prop].prototype = createProxyForClassPrototype(key, p5[prop]);
      } else {
        // It's almost certainly a documented class for an addon that
        // isn't currently loaded.
      }
    } else {
      console.log("Unrecognized class: " + key);
    }
  });

  // TODO: Show the super-swanky p5 ascii art logo here, as per
  // the original friendly debugger.
  console.log("Friendly Debugger Ready.");
}));
