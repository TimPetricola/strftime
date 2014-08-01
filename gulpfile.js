// https://gist.github.com/insin/8521968

var gulp          = require('gulp'),
    glob          = require('glob'),
    browserify    = require('gulp-browserify'),
    rename        = require('gulp-rename'),
    jshint        = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    clean         = require('gulp-clean'),
    flatten       = require('gulp-flatten'),
    plumber       = require('gulp-plumber'),
    react         = require('gulp-react'),
    concat        = require('gulp-concat');


// Deletes everything in the build and dist directories
gulp.task('clean', function() {
  return gulp
    .src(['./build', './dist'], {read: false})
    .pipe(clean());
});

// Copies .js files directly into the build modules dir
gulp.task('copy-js-src', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(flatten())
    .pipe(gulp.dest('./build/modules'))
});

// Compiles .jsx files to .js and copies directly into the build modules dir
gulp.task('compile-jsx', function() {
  return gulp
    .src('./src/**/*.jsx')
    .pipe(plumber())
    .pipe(react())
    .on('error', function(e) {
      console.error(e.message + '\n  in ' + e.fileName)
    })
    .pipe(flatten())
    .pipe(gulp.dest('./build/modules'));
});

// Lints the build modules dir
gulp.task('lint', ['copy-js-src', 'compile-jsx'], function() {
  return gulp
    .src('./build/modules/*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter(jshintStylish))
})

// Bundles the app into a single file, hooking up the flat requires with same-
// named modules in the build modules dir.
gulp.task('build-js', ['lint'], function(){
  return gulp
    .src(['./build/modules/app.js'])
    .pipe(plumber())
    .pipe(browserify())
    .on('error', function(e) {
      console.error(e);
    })
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('copy-css-src', ['lint'], function(){
  return gulp
    .src(['./src/**/*.css'])
    .pipe(flatten())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['build-js'])
  gulp.watch(['./src/**/*.css'], ['copy-css-src'])
});

gulp.task('default', ['clean'], function() {
  gulp.start('build-js', 'copy-css-src', 'watch')
})
