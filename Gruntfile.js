var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var appConfig = {
    app: 'app',
    dist: 'dist',
    copy: {
      src: [ // styles and scripts will be minified and added later
        '*.{ico,png,txt}',
        'bower_components/**/*',
        'temp/**/*',
        'vendor/**/*',
        'images/{,*/}*.{gif,webp}',
        'styles/fonts/{,*/}*.{woff,ttf,eot,svg,otf}'
      ]
    }
  };


  grunt.initConfig({
    appConfig: appConfig,
    bower: {
      install: {
        options: {
          targetDir: './bower_components',
          cleanBowerDir: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/*',
            '!<%= appConfig.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: appConfig.app,
          dest: appConfig.dist,
          src: appConfig.copy.src
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= appConfig.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    compass: {
      options: {
        config: 'app/config.rb',
        force: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: false
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= appConfig.dist %>/scripts/{,*/}*.js',
            '<%= appConfig.dist %>/styles/{,*/}*.css',
            // '<%= appConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= appConfig.dist %>/styles/fonts/{,*/}*.{woff,ttf,eot,svg,otf}'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= appConfig.app %>/index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },
    usemin: {
      html: [
        '<%= appConfig.dist %>/{,*/}*.html'
        // '<%= appConfig.dist %>/views/**/*.html' // TODO uncomment this to do html minification
      ],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: [appConfig.dist]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= appConfig.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of minification.
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= appConfig.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>/scripts',
          src: '*.js',
          dest: '<%= appConfig.dist %>/scripts'
        }]
      }
    },
    uglify: {
      options:{
        mangle: { // set to false in case issues with the undefined functions aor variables in the plugins
          except: ['$super']
        }
      },
      dist: {
        files: {
          '<%= appConfig.dist %>/scripts/scripts.js': [
            '<%= appConfig.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= appConfig.app %>/scripts/{,*/}*.js'
      ]
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    connect: {
      options: {
        port: 9001, // use different ports if you want to connect several folders at once. In this case default port can be busy with 'grunt server'
        hostname: '0.0.0.0' // used to be 'localhost'. Changed to '0.0.0.0' to access the server from host machine (VM).
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, appConfig.dist)
            ];
          }
        }
      }
    },
    open: { // open website in browser in a new tab
      server: {
        url: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    },
    watch: {
      compass: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      styles: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= appConfig.app %>/**/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= appConfig.app %>}/scripts/**/*.js',
          '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'copy',
      'connect:livereload',
      'open',
      'watch' // keep server alive (working)
    ]);
  });

  grunt.registerTask('server:local', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'copy',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'bower:install',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('build:dist-dev', ['copy', 'build']);

};