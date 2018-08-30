module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      css: {
        files: [{
          expand: true,
          src: ['src/**/*.css'],
          dest: 'dist/components',
          flatten: true,
        }],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};