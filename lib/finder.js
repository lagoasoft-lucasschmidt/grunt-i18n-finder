(function() {
  var DEFAULT_PATTERN, _, _s;

  _ = require('underscore');

  _s = require('underscore.string');

  DEFAULT_PATTERN = /\_\_\(((\".*\")|(\'.*\'))\)/g;

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
        var partial, toReturn;
        debug("original=" + result);
        if (_s.startsWith(result, "__(\"")) {
          partial = _s.strRight(result, "__(\"");
          debug("partial=" + partial);
          toReturn = _s.strLeft(partial, "\")");
          debug("toReturn=" + toReturn + "\n");
          return toReturn;
        } else {
          partial = _s.strRight(result, "__('");
          debug("partial=" + partial);
          toReturn = _s.strLeft(partial, "')");
          debug("toReturn=" + toReturn + "\n");
          return toReturn;
        }
      });
    }
    return null;
  };

}).call(this);
