/*
 * grunt-i18n-finder
 * https://github.com/lucasschmidt/grunt-i18n-finder
 *
 * Copyright (c) 2013 Lucas Schmidt
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('underscore'),
		path = require('path'),
		i18nFinder = require('../lib');

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('i18n_finder', 'Looks into files for references to i18n function calls. If found, verifies if all resource files contains entries for them. If not, a new entry is created.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({debug:false});
		options.log = function(text){
			grunt.log.writeln(text);
		};

		var globalStats = {};
		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			options.translationFolder = f.dest;
			grunt.file.mkdir(options.translationFolder);
			f.src.forEach(function(filePath){
				if(_.isString(f.cwd)){
					filePath = path.join(f.cwd, filePath);
				}
				var localStats = i18nFinder(filePath, options);
				if(_.isObject(localStats)){
					_.each(_.keys(localStats), function(language){
						grunt.log.ok("On file="+filePath+" and lang="+language+" found "+localStats[language].found+" resources, added "+localStats[language].added+" resources!");
						if(!_.has(globalStats, language)){
							globalStats[language] = {added:0, found:0};
						}
						globalStats[language].found = globalStats[language].found + localStats[language].found;
						globalStats[language].added = globalStats[language].added + localStats[language].added;
					});
				}
			});
		});
		//log stats
		if(_.isObject(globalStats)){
			_.each(_.keys(globalStats), function(language){
				grunt.log.ok("Globally on lang="+language+" found "+globalStats[language].found+" resources, added "+globalStats[language].added+" resources!");
			});
		}
	});

};
