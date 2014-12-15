module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");

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

		concat: {
			all: {
				src: '<%= config.src %>/*.js',	
				dest: '<%= config.dist %>/loopy.js',
			}
		},

		jshint: {
			all: [
				"src/*.js",
			],
		},
	});

	grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('default', ['test']);
};
