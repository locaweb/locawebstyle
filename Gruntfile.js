module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Here we put some informations about the project like CSS or JS folder path.
    project: {
      files: {
        js: 'source/assets/javascripts/locastyle/**/*.js',
        css: 'source/assets/stylesheets/locastyle/**/*.css'
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= project.files.js %>'],
      options: {
        funcscope: true,
        globalstrict: false,
        unused: true,
        validthis: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    plato: {
      task: {
        files: {
        'spec/report-js': ['<%= project.files.js %>']
        }
      }
    },
    githooks: {
      all: {
        'pre-commit': 'jshint',
      }
    },
    watch: {
      files: ['<%= project.files.js %>'],
      tasks: ['jshint', 'githooks']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-plato');

  grunt.registerTask('default', ['plato', 'jshint']);
  grunt.registerTask('test', ['jshint']);
};

