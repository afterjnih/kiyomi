'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var electron = require('electron-connect').server.create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var espower = require('gulp-espower');
var mocha = require('gulp-mocha');
var TEST = ['./test/*.es6'];

gulp.task('default', ['start'], function(){
});

/* sass task */
gulp.task('sass', function(){
  return gulp.src('./src/styles/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/styles/'));
});

gulp.task('babel_browser', function(){
  return gulp.src('./src/browser/*.{es6,jsx}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/browser/'));
});

gulp.task('babel_renderer', function(){
  return gulp.src('./src/renderer/*.{es6,jsx}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/renderer/'));
});

gulp.task('babel_component', function(){
  return gulp.src('./src/renderer/components/*.{es6,jsx}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/renderer/components/'));
});

gulp.task('babel_lib', function(){
  return gulp.src('./src/lib/*.{es6,jsx}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/lib/'));
});

gulp.task('babel_app', function(){
  return gulp.src('./src/app.{es6,jsx}')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('copy_html', function(){
  return gulp.src('./src/index.html')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulp.dest('./app/'));
})

gulp.task('packaging', function(){
});

gulp.task('powered-test', function(){
  return gulp.src(TEST)
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 0
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./powered-test/'));
});

gulp.task('test', ['babel_component', 'babel_browser', 'babel_renderer', 'babel_app', 'sass', 'copy_html', 'powered-test'], function(){
  return gulp.src('./powered-test/*.js')
         .pipe(plumber({
           errorHandler: notify.onError('Error: <%= error.message %>')
         }))
         .pipe(espower())
         .pipe(mocha());
});

gulp.task('watch', function(){
  gulp.watch(['./src/**/*.{es6,jsx}', './src/*.{es6,jsx}'], ['babel_browser', 'babel_renderer', 'babel_app','babel_component', 'babel_lib']);
  gulp.watch(['./src/styles/*.scss'], ['sass']);
  gulp.watch(['./src/index.html'], ['copy_html']);
});

gulp.task('start', ['watch', 'babel_component', 'babel_browser', 'babel_renderer', 'babel_app', 'sass', 'copy_html'], function ()  {
  electron.start();
  //gulp.watch('./src/**/*.es6', ['babel_browser', 'babel_renderer']);
  gulp.watch(['./app/app.js','./app/browser/*.js'], electron.restart);
  gulp.watch(['./app/index.html', './app/renderer/*.js', './app/styles/*.css'], electron.reload);
});
