fs = require 'fs'
_ = require 'underscore'
i18nExpressionsFinder = require './finder'
path = require 'path'


module.exports = (filePath, options={}, cb)->
	debug = (text)->
		if options?.debug is true then options.log "Debug: #{text}"
	warn = (text, e)->
		if options?.debug is true then options.log "Warn: #{text}"
		if options?.debug is true and e? then console.error e

	translationFolder = options?.translationFolder
	translationExtension = options?.translationExtension or '.json'
	supportedLanguages = options?.supportedLanguages or ['en']
	options.write = options.write or true
	options.resetFile = options.resetFile or false

	debug "Trying to find i18n references into file #{filePath} with options #{JSON.stringify(options)}\n"

	content = fs.readFileSync(filePath)

	if _.isFunction(options.findExpressions)
		resources = options.findExpressions(content.toString(), options)
	else
		resources = i18nExpressionsFinder(content.toString(), options)

	debug("Found="+JSON.stringify(resources))

	if !_.isArray(resources)
		if _.isFunction(cb) then return cb() else return

	if !_.isString(translationFolder)
		warn("Translation folder is not set")
		if _.isFunction(cb) then return cb() else return

	for language in supportedLanguages
		debug("Trying to save found results into language file for lang="+language)
		languagePath = path.join translationFolder, language+translationExtension
		debug("File for language has path #{languagePath}")

		languageJSON = {}
		if options.resetFile is false and fs.existsSync(languagePath)
			debug("Language file for lang #{language} exists, trying to read")
			try
				languageJSON = JSON.parse(fs.readFileSync(languagePath))
				debug("Successfully read lang file #{language}")
			catch e
				warn("Error during read of JSON file #{languagePath}", e)

		for resource in resources
			if _.has(languageJSON, resource)
				debug("Lang #{language} already has resource=#{resource}")
			else
				debug("Lang #{language} doesnt have resource=#{resource}")
				languageJSON[resource] = resource

		if options.write
			debug("Will try to write lang #{language} file")
			fs.writeFileSync(languagePath, JSON.stringify( languageJSON, null, "\t" ) )
			debug("Successfully wrote lang #{language} file")
		else
			debug("Wont write lang #{language} since write is off")

	if _.isFunction(cb) then return cb() else return
