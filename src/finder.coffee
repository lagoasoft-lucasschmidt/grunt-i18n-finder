_ = require 'underscore'
_s = require 'underscore.string'

DEFAULT_PATTERN = ///
	\_\_\( # find Expression call
	(
	(\".*\") # the content
	| # OR
	(\'.*\') # the content
	)
	\)
///g




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
			if _s.startsWith(result, "__(\"")
				partial = _s.strRight(result, "__(\"")
				debug "partial=#{partial}"
				toReturn = _s.strLeft(partial, "\")")
				debug "toReturn=#{toReturn}\n"
				return toReturn
			else
				partial = _s.strRight(result, "__('")
				debug "partial=#{partial}"
				toReturn = _s.strLeft(partial, "')")
				debug "toReturn=#{toReturn}\n"
				return toReturn
	return null
