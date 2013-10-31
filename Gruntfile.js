module.exports = function(grunt){
	'use strict';

	// Project configuration.
	grunt.initConfig({
		buster: {
			all: {
				test: {
					config: 'test/buster.js'
				},
				server: {
					port: 1111
				}
			},
			options: {
				growl: true
			}
		},

		jshint: {
			files: ['Source/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-buster');
	// By default, clean and generate docs
	grunt.registerTask('default', ['jshint','buster:all']);
};