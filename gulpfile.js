'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var electron = require('electron-connect').server.create();

gulp.task('default', ['watch', 'babel_node', 'babel_client'], function(){
});

gulp.task('babel_node', function(){
  return gulp.src('./src/node/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/node/'));
});

gulp.task('babel_client', function(){
  return gulp.src('./src/client/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/client/'));
});

gulp.task('packaging', function(){
});

gulp.task('test', function(){
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.es6', ['babel_node', 'babel_client']);
});

gulp.task('start', ['babel_node', 'babel_client'], function ()  {
  electron.start();
  gulp.watch('./src/**/*.es6', ['babel_node', 'babel_client']);
  gulp.watch(['./app/node/index.js','./app/client/*.js'], electron.restart);
  gulp.watch(['./app/index.html'], electron.reload);
});
