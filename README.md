# grunt-i18n-finder

> Looks into files for references to i18n function calls. If found, verifies if all resource files contains entries for them. If not, a new entry is created. See https://github.com/mashpie/i18n-node

> Eg: If you have a jade Template, or any other file ...

```jade
h1 !{__('This is a resource')}
```
> Eg: if you have resource files, like en.js or en.json

```js
{
"This is a resource":"This is a resource"

}
```
> You can use this tool, to, search all your source files (jade, js, coffee ...), for references to the i18n library. The tool will, based on all configured languages, create or update all language files and add the resources missing.


> This is usefull since, you wont need to add new resources manually to the language files, or to wait for the library to add them for you there.

> The implementation that detects the resources into files is very basic, so, based on what you do, you might want to modify that by implementing a function and passing as the options.findExpressions fileContent, options




## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-finder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-finder');
```

## The "i18n_finder" task

### Overview
In your project's Gruntfile, add a section named `i18n_finder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  i18n_finder: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.findExpressions
Type: `Function`
Default value:

You can implement this function, that receives two arguments: fileContent as String, and options.

This function must return an array of Strings, where each String represents a resource key.

#### options.write
Type: `Boolean`
Default value: true

If false, changes wont be saved into disk. But you can still use the tool as a report tool.

#### options.resetFile
Type: `Boolean`
Default value: false

If true, all language files will be created from stratch. This means, if you had resources not used, they wont be there anymore, if not detected.


#### options.supportedLanguages
Type: `Array`
Default value: ["en"]

All the languages described here will have its language files processed.


#### options.translationExtension
Type: `String`
Default value: ".json"

The extension where the resource files are stored.

#### options.debug
Type: `Boolean`
Default value: false

If true, grunt will output debug messages.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  i18n_finder: {
			default_options: {
				options: {}
				cwd: 'test/fixtures/'
				src: ['**/*.coffee'] // all source files that should be analyzed for i18n references
				dest: 'tmp' // where its stored the resource files eg: en.json
			}
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Most code is written in coffe-script, so, use Grunt to compile. The task is written in Javascript.

## Release History
* 0.0.3 - Improved Detection of __("Resource"), now checks for spaces between ( and " ...
* 0.0.2 - Improved Stats, now they are logged in grunt output
* 0.0.1 - First Version, Support for __() expressions built in.
