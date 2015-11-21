'use strict';

var gulp = require('gulp');

var typescript = require('gulp-typescript');
var typescriptAngular = require('../index.js');

gulp.task('scripts-decorator', function () {
  return gulp.src(
    [
     './src/decorator/*.ts',
     './typings/**/*.d.ts'
    ])
    .pipe(typescript({
      target:'es5',
      experimentalDecorators:true
    }))
    .pipe(typescriptAngular({
      decoratorModuleName:'sample'
    }))
    .pipe(gulp.dest('./dist/decorator'));
});

gulp.task('scripts', function () {
  return gulp.src(
    [
     './src/naming_rule/*.ts',
     './typings/**/*.d.ts'
    ])
    .pipe(typescript({
     target:'es5',
     experimentalDecorators:true
    }))
    .pipe(typescriptAngular({
      moduleName:'sample'
    }))
    .pipe(gulp.dest('./dist/naming_rule'));
});

gulp.task('default', function () {
    gulp.start('scripts');
    gulp.start('scripts-decorator');

});
