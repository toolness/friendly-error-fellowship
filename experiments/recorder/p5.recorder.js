(function (root, factory) {
if (typeof define === 'function' && define.amd)
define('p5.recorder', ['p5'], function (p5) { (factory(p5));});
else if (typeof exports === 'object')
factory(require('../p5'));
else
factory(root['p5']);
}
(this, function (p5) {
  var NO_RECORD_METHODS = [
    'random',
    'createVector',
    'color'
  ];

  function getCallerStackFrame() {
    var err;
    try { throw new Error(); } catch (e) { err = e; }
    var frames = ErrorStackParser.parse(err);
    return frames[2];
  }

  Object.keys(p5.prototype).filter(function(prop) {
    return (!/^_/.test(prop) &&
            typeof(p5.prototype[prop]) === 'function' &&
            NO_RECORD_METHODS.indexOf(prop) === -1);
  }).forEach(function(prop) {
    var originalFunc = p5.prototype[prop];

    p5.prototype[prop] = function wrapper() {
      var stackFrame, i;

      if (this._isRecording) {
        stackFrame = getCallerStackFrame();
        if (!/p5\.js/.test(stackFrame.fileName)) {
          this._recording.current.push({
            method: prop,
            args: [].slice.call(arguments)
          });
        }
      }
      return originalFunc.apply(this, arguments);
    };
  });

  p5.prototype.startRecording = function() {
    this._recording = {
      setup: [],
      frames: []
    };

    this._isRecording = true;
    this._recording.current = this._recording.setup;
  };

  p5.prototype.stopRecording = function() {
    this._isRecording = false;
  };

  p5.prototype.getRecording = function() {
    var pInst = this;
    var output = [];
    var indentLevel = 0;
    var indent = function() {
      indentLevel++;
    };
    var dedent = function() {
      indentLevel--;
    };
    var emit = function(text) {
      for (var i = 0; i < indentLevel; i++) {
        output.push('  ');
      }
      output.push(text, '\n');
    };
    var emitCall = function(call) {
      if (call.method === 'pop') {
        dedent();
      }

      emit(call.method + '(' + call.args.map(function(arg) {
        if (typeof(arg) === 'number' || typeof(arg) === 'string') {
          return JSON.stringify(arg);
        } else if (arg instanceof p5.Color) {
          if (arg.mode !== pInst.RGB) {
            throw new Error('expected color mode to be RGB');
          }
          return arg.toString().replace('rgba', 'color');
        } else {
          console.log("dunno how to serialize arg for " + call.method, arg);
          throw new Error("dunno how to serialize " + arg);
        }
      }).join(', ') + ');');

      if (call.method === 'push') {
        indent();
      }
    };

    emit('function setup() {');
    indent();
    this._recording.setup.forEach(emitCall);
    dedent();
    emit('}\n');

    emit('function draw() {');
    indent();
    emit('drawFrames[frameCount - 1]();');
    dedent();
    emit('}\n');

    emit('var drawFrames = [');
    indent();
    this._recording.frames.forEach(function(frameCalls, i) {
      emit('function drawFrame_' + (i + 1) + '() {');
      indent();
      frameCalls.forEach(emitCall);
      dedent();
      emit('}' + (i === this._recording.frames.length - 1 ? '' : ','));
    }, this);
    dedent();
    emit('];');

    return output.join('');
  };

  p5.prototype.registerMethod('pre', function() {
    if (this._isRecording) {
      var newFrameRecording = [];
      this._recording.frames.push(newFrameRecording);
      this._recording.current = newFrameRecording;      
    }
  });
}));
