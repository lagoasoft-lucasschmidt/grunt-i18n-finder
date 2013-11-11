#
# * grunt-i18n-finder
# * https://github.com/lucasschmidt/grunt-i18n-finder
# *
# * Copyright (c) 2013 Lucas Schmidt
# * Licensed under the MIT license.
#

module.exports = (grunt) ->

	# Project configuration.
	grunt.initConfig
		jshint:
			all: ["Gruntfile.js", "tasks/*.js", "<%= nodeunit.tests %>"]
			options:
				jshintrc: ".jshintrc"


		# Before generating any new files, remove any previously-created files.
		clean:
			tests: ["tmp"]
			lib: ["lib"]


		coffee:
			server:
				expand: true
				cwd:'src'
				src: ['**/*.coffee']
				dest: 'lib'
				ext: '.js'

		# Configuration to be run (and then tested).
		i18n_finder:
			default_options:
				options: {debug:true}
				cwd: 'test/fixtures/'
				src: ['**/*.coffee']
				dest: 'tmp'

		# Unit tests.
		nodeunit:
			tests: ["test/*_test.js"]


	# Actually load this plugin's task(s).
	grunt.loadTasks "tasks"

	# These plugins provide necessary tasks.
	grunt.loadNpmTasks "grunt-contrib-jshint"
	grunt.loadNpmTasks "grunt-contrib-clean"
	grunt.loadNpmTasks "grunt-contrib-nodeunit"
	grunt.loadNpmTasks "grunt-contrib-coffee"

	# Whenever the "test" task is run, first clean the "tmp" dir, then run this
	# plugin's task(s), then test the result.
	grunt.registerTask "test", ["clean", "coffee", "i18n_finder", "nodeunit"]

	# By default, lint and run all tests.
	grunt.registerTask "default", ["jshint", "test"]
