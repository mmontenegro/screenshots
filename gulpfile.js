var gulp = require('gulp');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var connect = require('gulp-connect');

gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('lib/'))
});

gulp.task('scripts', function() {
  gulp.src([
  	'./lib/zepto/zepto.js',
  	'./lib/html2canvas/build/html2canvas.js',
  	'./js/*'
  	])
    .pipe(concat('screenshots.js', {newLine: ';'}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('connect', connect.server({
  root: ['dist'],
  port: 1337,
  livereload: true
}));

gulp.task('default', ['bower','scripts', 'connect']);