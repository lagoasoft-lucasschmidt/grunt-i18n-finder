(function() {
  var DEFAULT_PATTERN, _, _s;

  _ = require('underscore');

  _s = require('underscore.string');

  DEFAULT_PATTERN = /\_\_\(\s*((\"(.*)\")|(\'(.*)\'))\s*[\),]/g;

  module.exports = function(fileContent, options) {
    var debug, m, match, pattern, results, _i, _len;
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
    pattern = new RegExp(pattern);
    results = [];
    match = pattern.exec(fileContent);
    while (match != null) {
      for (_i = 0, _len = match.length; _i < _len; _i++) {
        m = match[_i];
        debug(JSON.stringify(m));
      }
      if (_.isArray(match) && match.length > 0) {
        results.push(match[match.length - 1]);
      }
      match = pattern.exec(fileContent);
    }
    return results;
  };

}).call(this);
