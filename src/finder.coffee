_ = require 'underscore'
_s = require 'underscore.string'

DEFAULT_PATTERN = ///
	\_\_\( # find Expression call
	\s* # ignore whitespace
	(
	(\"(.*)\") # the content
	| # OR
	(\'(.*)\') # the content
	)
	\s* # ignore whitespace
	[\),] # ends with ')' or ','' if it has parameters
///g




module.exports = (fileContent, options)->
	debug = (text)->
		if options?.debug is true then options.log text
	if !_.isString(fileContent) then throw new Error("File content must be informed and string but got #{typeof fileContent}")
	pattern = options?.pattern or DEFAULT_PATTERN
	if !_.isRegExp(pattern) then throw new Error("Pattern must be a regex expr")

	pattern = new RegExp(pattern)

	results = []
	match = pattern.exec fileContent
	while match?
		for m in match
			debug JSON.stringify(m)
		if _.isArray(match) and match.length > 0 then results.push match[match.length - 1]
		match = pattern.exec fileContent

	return results
