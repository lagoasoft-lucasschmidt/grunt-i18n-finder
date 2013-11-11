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

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			options.translationFolder = f.dest;
			grunt.file.mkdir(options.translationFolder);
			f.src.forEach(function(filePath){
				if(_.isString(f.cwd)){
					filePath = path.join(f.cwd, filePath);
				}
				grunt.log.writeln('Analyzing file '+filePath+' with results output on '+options.translationFolder);
				i18nFinder(filePath, options);
			});
		});
	});

};
