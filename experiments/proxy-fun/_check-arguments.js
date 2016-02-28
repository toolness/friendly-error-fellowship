define('check-arguments', function() {
  var typeValidators = {
    'Number': function(value) {
      return typeof(value) === 'number';
    },
    'String': function(value) {
      return typeof(value) === 'string';
    },
    'p5.Color': function(value) {
      return value instanceof p5.Color;
    },
    'p5.Image': function(value) {
      return value instanceof p5.Image;
    }
  };

  function buildTypeValidator(type) {
    var validators = type.split('|').map(function(type) {
      if (typeof(typeValidators[type]) !== 'function')
        throw new Error('Unknown type: ' + type);
      return typeValidators[type];
    });

    return function(value) {
      return validators.some(function(typeValidator) {
        return typeValidator(value);
      });
    };
  }

  function buildParamValidator(classitem, param, argIndex) {
    var isValidType = buildTypeValidator(param.type);

    return function(value) {
      if (!isValidType(value)) {
        if (!param.optional) {
          console.log("Invalid value for arg #" + (argIndex + 1) + " (" +
                      param.name + ") of " + classitem.name + "()");
        }
      }
    };
  }

  function buildValidator(classitem) {
    var name = classitem.name;
    var paramValidators = (classitem.params || [])
      .map(buildParamValidator.bind(null, classitem));

    return {
      validate: function(target, thisArg, argumentsList) {
        paramValidators.forEach(function(paramValidator, i) {
          paramValidator(argumentsList[i], i);
        });
      }
    };
  };

  function checkArguments(target, thisArg, argumentsList, classitem) {
    if (!classitem.validator)
      classitem.validator = buildValidator(classitem);

    classitem.validator.validate(target, thisArg, argumentsList);
  }

  checkArguments._buildValidator = buildValidator;

  return checkArguments;
});
