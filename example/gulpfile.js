'use strict';

var gulp = require('gulp');

var typescript = require('gulp-typescript');
var typescriptAngular = require('../index.js');


gulp.task('scripts', function () {
  return gulp.src('./**/*.ts')
    .pipe(typescript())
    .pipe(typescriptAngular({
      moduleName:'sample'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    gulp.start('scripts');
});
