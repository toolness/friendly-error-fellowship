define('check-arguments', function() {
  function buildValidator(classitem) {
    // TODO: Parse classitems.params[].type, validate it, make validators.
    return {

    };
  };

  function checkArguments(target, thisArg, argumentsList, classitem) {
    if (!classitem.validator)
      classitem.validator = buildValidator(classitem);

    // TODO: Check arguments, provide feedback if needed.
  }

  checkArguments._buildValidator = buildValidator;

  return checkArguments;
});
