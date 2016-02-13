define('friendly-welcome', [
  './log-with-css'
], function(logWithCss) {
  // Mostly taken from p5's src/core/error_helpers.js.
  return function friendlyWelcome() {
    // p5.js brand - magenta: #ED225D
    var astrixBgColor = 'transparent';
    var astrixTxtColor = '#ED225D';
    var welcomeBgColor = '#ED225D';
    var welcomeTextColor = 'white';

    logWithCss({
      text: '    _ \n'+
            ' /\\| |/\\ \n'+
            ' \\ ` \' /  \n'+
            ' / , . \\  \n'+
            ' \\/|_|\\/ ',
      css: {
        background: astrixBgColor,
        color: astrixTxtColor
      }
    }, {
      text: '\n\n> p5.js says: Welcome! This is your friendly debugger.',
      css: {
        background: welcomeBgColor,
        color: welcomeTextColor
      }
    });
  };
});
