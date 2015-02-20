module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: '<%= project.jasmine.files %>',
      options: {
        specs: 'spec/javascripts/*_spec.js',
        helpers: 'spec/javascripts/helpers/*.js',
        vendor: [
          "spec/javascripts/libs/*.js"
        ]
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
        'source/documentacao/report-js': ['<%= project.files.js %>']
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
      tasks: ['']
    },

    ////
    // Here we put some informations about the project like CSS or JS folder path.
    ////
    project: {
      files: {
        js: 'source/assets/javascripts/locastyle/**/*.js',
        css: 'source/assets/stylesheets/locastyle/**/*.css',
      },
      jasmine: {
        files: [
          "source/assets/javascripts/libs/_hopscotch.js",
          "source/assets/javascripts/libs/_jquery.cookie.js",
          "source/assets/javascripts/libs/jquery.mask.js",
          "source/assets/javascripts/libs/moment.min.js",
          "source/assets/javascripts/libs/pikaday.js",
          "source/assets/javascripts/libs/pikaday.jquery.js",
          "source/assets/javascripts/locastyle/_initializer.js",
          "source/assets/javascripts/locastyle/_datepicker.js",
          "source/assets/javascripts/locastyle/_popover.js",
          "source/assets/javascripts/locastyle/_templates.js",
          "source/assets/javascripts/locastyle/_collapse.js",
          "source/assets/javascripts/locastyle/_tabs.js",
          "source/assets/javascripts/locastyle/_dropdown.js",
          "source/assets/javascripts/locastyle/_general.js",
          "source/assets/javascripts/locastyle/_modal.js",
          "source/assets/javascripts/locastyle/_alert.js",
          "source/assets/javascripts/locastyle/_form.js",
          "source/assets/javascripts/locastyle/_dismiss.js",
          "source/assets/javascripts/locastyle/_breakpoint-check.js",
          "source/assets/javascripts/locastyle/_topbar-curtain.js",
          "source/assets/javascripts/locastyle/_btn-group.js",
          "source/assets/javascripts/locastyle/_sidebars.js",
          "source/assets/javascripts/locastyle/_sidebar-toggle.js",
          "source/assets/javascripts/locastyle/_progress-bar.js",
          "source/assets/javascripts/locastyle/_char-counter.js",
          "source/assets/javascripts/locastyle/_track-events.js",
          "source/assets/javascripts/locastyle/_browser-detect.js",
          "source/assets/javascripts/locastyle/_browser-unsupported-bar.js",
          "source/assets/javascripts/locastyle/_steps.js",
          "source/assets/javascripts/locastyle/_tabs-button.js",
        ]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-plato');

  grunt.registerTask('default', ['plato', 'jshint']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
};

