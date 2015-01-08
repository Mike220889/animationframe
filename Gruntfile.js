module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-browserify");

	grunt.initConfig({
		config : {
			src: 'src',
			dist: 'dist',
		},

		uglify: {
			all: {
				files: { '<%= config.dist %>/loopy.min.js': '<%= config.dist %>/loopy.js' },
			}
		},

		jshint: {
			all: [
				"src/*.js",
			],
		},

		qunit: {
			main: ['tests/index.html'],
		},

		watch: {
			tests: {
				files: ['tests/*'],
				tasks: ['test'],
			},
			dist: {
				files: ['src/*.js'],
				tasks: ['build'],
			},
			dev : {
				files: ['src/*.js'],
				tasks: ['browserify'],
			}
		},

		browserify: {
			files: {
				src: '<%= config.src %>/index.js',
				dest: '<%= config.dist %>/loopy.js',
			}
		}
	});

	grunt.registerTask('test', ['qunit:main']);
	grunt.registerTask('build', ['jshint', 'browserify', 'uglify']);
	grunt.registerTask('default', ['test']);
};
