var gulp = require('gulp');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var connect = require('gulp-connect');

gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('lib/'))
});

gulp.task('script_screenshot', function() {
  gulp.src([
  	'./lib/zepto/zepto.js',
    './lib/socket.io-client/dist/socket.io.js',
  	'./lib/html2canvas/build/html2canvas.js',

    './js/config.js',
    './js/transport.js',
  	'./js/screenshots.js'
  	])
    .pipe(concat('screenshots.js', {newLine: ';'}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('script_watch', function() {
  gulp.src([
    './lib/zepto/zepto.js',
    './lib/socket.io-client/dist/socket.io.js',
    './lib/html2canvas/build/html2canvas.js',

    './js/config.js',
    './js/transport.js',
    './js/watch.js'
    ])
    .pipe(concat('watch.js', {newLine: ';'}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('connect', connect.server({
  root: ['dist'],
  port: 1337,
  livereload: true
}));

gulp.task('all', ['bower', 'build']);
gulp.task('build', ['script_screenshot','script_watch']);