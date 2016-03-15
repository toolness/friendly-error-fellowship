function createEmitter() {
  var indentLevel = 0;
  var lastText = '';
  var currentSourceFile;

  var emit = function(text) {
    var indentation = [];
    for (var i = 0; i < indentLevel; i++) {
      indentation.push('  ');
    }
    console.log(indentation.join('') + text);
    lastText = text;
  };

  emit.setCurrentSourceFile = function(file) {
    if (file !== currentSourceFile) {
      currentSourceFile = file;
      emit.sectionBreak();
      emit('// ' + file);
      emit.sectionBreak();
    }
  };

  emit.sectionBreak = function() {
    if (lastText !== '' && !/\{$/.test(lastText)) {
      emit('');
    }
  };

  emit.indent = function() {
    indentLevel++;
  };

  emit.dedent = function() {
    indentLevel--;
  };

  return emit;
}

module.exports = createEmitter;
