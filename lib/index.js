(function() {
  var fs, i18nExpressionsFinder, path, _;

  fs = require('fs');

  _ = require('underscore');

  i18nExpressionsFinder = require('./finder');

  path = require('path');

  module.exports = function(filePath, options, cb) {
    var content, debug, e, language, languageJSON, languagePath, resource, resources, supportedLanguages, translationExtension, translationFolder, warn, _i, _j, _len, _len1;
    if (options == null) {
      options = {};
    }
    debug = function(text) {
      if ((options != null ? options.debug : void 0) === true) {
        return options.log("Debug: " + text);
      }
    };
    warn = function(text, e) {
      if ((options != null ? options.debug : void 0) === true) {
        options.log("Warn: " + text);
      }
      if ((options != null ? options.debug : void 0) === true && (e != null)) {
        return console.error(e);
      }
    };
    translationFolder = options != null ? options.translationFolder : void 0;
    translationExtension = (options != null ? options.translationExtension : void 0) || '.json';
    supportedLanguages = (options != null ? options.supportedLanguages : void 0) || ['en'];
    options.write = options.write || true;
    options.resetFile = options.resetFile || false;
    debug("Trying to find i18n references into file " + filePath + " with options " + (JSON.stringify(options)) + "\n");
    content = fs.readFileSync(filePath);
    if (_.isFunction(options.findExpressions)) {
      resources = options.findExpressions(content.toString(), options);
    } else {
      resources = i18nExpressionsFinder(content.toString(), options);
    }
    debug("Found=" + JSON.stringify(resources));
    if (!_.isArray(resources)) {
      if (_.isFunction(cb)) {
        return cb();
      } else {
        return;
      }
    }
    if (!_.isString(translationFolder)) {
      warn("Translation folder is not set");
      if (_.isFunction(cb)) {
        return cb();
      } else {
        return;
      }
    }
    for (_i = 0, _len = supportedLanguages.length; _i < _len; _i++) {
      language = supportedLanguages[_i];
      debug("Trying to save found results into language file for lang=" + language);
      languagePath = path.join(translationFolder, language + translationExtension);
      debug("File for language has path " + languagePath);
      languageJSON = {};
      if (options.resetFile === false && fs.existsSync(languagePath)) {
        debug("Language file for lang " + language + " exists, trying to read");
        try {
          languageJSON = JSON.parse(fs.readFileSync(languagePath));
          debug("Successfully read lang file " + language);
        } catch (_error) {
          e = _error;
          warn("Error during read of JSON file " + languagePath, e);
        }
      }
      for (_j = 0, _len1 = resources.length; _j < _len1; _j++) {
        resource = resources[_j];
        if (_.has(languageJSON, resource)) {
          debug("Lang " + language + " already has resource=" + resource);
        } else {
          debug("Lang " + language + " doesnt have resource=" + resource);
          languageJSON[resource] = resource;
        }
      }
      if (options.write) {
        debug("Will try to write lang " + language + " file");
        fs.writeFileSync(languagePath, JSON.stringify(languageJSON, null, "\t"));
        debug("Successfully wrote lang " + language + " file");
      } else {
        debug("Wont write lang " + language + " since write is off");
      }
    }
    if (_.isFunction(cb)) {
      return cb();
    } else {

    }
  };

}).call(this);
