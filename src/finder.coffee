_ = require 'underscore'
_s = require 'underscore.string'

DEFAULT_PATTERN = ///
	\_\_\(\s* # find Expression call
	(
	(\".*\") # the content
	| # OR
	(\'.*\') # the content
	)
	\s*\)
///g

REPLACE_LEFT_PATTERN = ///
\_\_\(\s*[\"\']
///

REPLACE_RIGHT_PATTERN = ///
[\"\']\s*\)
///



module.exports = (fileContent, options)->
	debug = (text)->
		if options?.debug is true then options.log text
	if !_.isString(fileContent) then throw new Error("File content must be informed and string but got #{typeof fileContent}")
	pattern = options?.pattern or DEFAULT_PATTERN
	if !_.isRegExp(pattern) then throw new Error("Pattern must be a regex expr")

	results = fileContent.match(pattern)
	if _.isArray(results)
		return _.map results, (result)->
			debug "original=#{result}"
			toReturn = result.replace(REPLACE_LEFT_PATTERN, "").replace(REPLACE_RIGHT_PATTERN, "")
			debug "toReturn=#{toReturn}"
			return toReturn
	return null
