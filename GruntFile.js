module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'dist/all.js',
        options: {
          sourceMap: true,
          declaration: true,
          target: 'es5'
        }
      },
      test: {
        src: ['test/**/*.ts'],
        dest: 'dist/',
        options: {
          module: 'commonjs',
          sourceMap: true,
          declaration: true,
          target: 'es5'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['dist/test/**/*.js']
      }
    }
  });
  grunt.registerTask('test', ['typescript', 'mochaTest']);
  grunt.registerTask('default', ['typescript']);
}