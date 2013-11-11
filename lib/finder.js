(function() {
  var DEFAULT_PATTERN, REPLACE_LEFT_PATTERN, REPLACE_RIGHT_PATTERN, _, _s;

  _ = require('underscore');

  _s = require('underscore.string');

  DEFAULT_PATTERN = /\_\_\(\s*((\".*\")|(\'.*\'))\s*\)/g;

  REPLACE_LEFT_PATTERN = /\_\_\(\s*[\"\']/;

  REPLACE_RIGHT_PATTERN = /[\"\']\s*\)/;

  module.exports = function(fileContent, options) {
    var debug, pattern, results;
    debug = function(text) {
      if ((options != null ? options.debug : void 0) === true) {
        return options.log(text);
      }
    };
    if (!_.isString(fileContent)) {
      throw new Error("File content must be informed and string but got " + (typeof fileContent));
    }
    pattern = (options != null ? options.pattern : void 0) || DEFAULT_PATTERN;
    if (!_.isRegExp(pattern)) {
      throw new Error("Pattern must be a regex expr");
    }
    results = fileContent.match(pattern);
    if (_.isArray(results)) {
      return _.map(results, function(result) {
        var toReturn;
        debug("original=" + result);
        toReturn = result.replace(REPLACE_LEFT_PATTERN, "").replace(REPLACE_RIGHT_PATTERN, "");
        debug("toReturn=" + toReturn);
        return toReturn;
      });
    }
    return null;
  };

}).call(this);
