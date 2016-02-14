define('log-with-css', [], function() {
  var USER_AGENT = typeof(navigator) !== 'undefined' && navigator.userAgent;
  var CONSOLE_SUPPORTS_COLOR = (
    // As of 2016-02-13, Microsoft Edge doesn't support console colors.
    !/Edge\/\d+/.test(USER_AGENT)
  );

  // Log a chunk of text with multiple CSS styles as a single console
  // message on browsers that support it. Browsers that don't support
  // color will display a single plain-text message without any garbled
  // characters or exposed CSS code.
  function logWithCss() {
    var args = [].slice.call(arguments);
    var consoleArgs = [];

    if (CONSOLE_SUPPORTS_COLOR) {
      // http://stackoverflow.com/a/13017382/2422398
      consoleArgs.push(args.map(function(options) {
        return '%c' + options.text;
      }).join(''));
      consoleArgs.push.apply(consoleArgs, args.map(function(options) {
        return renderCssString(options.css);
      }));
      console.log.apply(console, consoleArgs);
    } else {
      console.log(args.map(function(options) {
        return options.text;
      }).join(''));
    }
  }

  function renderCssString(cssDict) {
    var el = document.createElement('div');
    Object.keys(cssDict).forEach(function(key) {
      el.style[key] = cssDict[key];
    });
    return el.getAttribute('style');
  }

  // Expose for testing.
  logWithCss._renderCssString = renderCssString;

  return logWithCss;
});
