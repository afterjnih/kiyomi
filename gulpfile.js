'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var electron = require('electron-connect').server.create();

gulp.task('default', ['watch', 'babel_node', 'babel_client'], function(){
});

gulp.task('babel_browser', function(){
  return gulp.src('./src/browser/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/browser/'));
});

gulp.task('babel_renderer', function(){
  return gulp.src('./src/renderer/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/renderer/'));
});

gulp.task('babel_app', function(){
  return gulp.src('./src/app.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('packaging', function(){
});

gulp.task('test', function(){
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.es6', ['babel_node', 'babel_client']);
});

gulp.task('start', ['babel_browser', 'babel_renderer', 'babel_app'], function ()  {
  electron.start();
  gulp.watch('./src/**/*.es6', ['babel_browser', 'babel_renderer']);
  gulp.watch(['./app/app.js','./app/browser/*.js'], electron.restart);
  gulp.watch(['./app/index.html', './app/renderer/*.js'], electron.reload);
});
