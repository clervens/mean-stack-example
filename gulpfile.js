var gulp  = require('gulp'),
    ts = require('gulp-typescript'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

var paths = {
  appJavascript: ['./app_client/**/*.ts', '!node_modules/**/*.*'],
  appScss: ['./app_client/**/*.scss', '!node_modules/**/*.*'],
  appImage: ['./app_client/assets/img/**/*', '!node_modules/**/*.*'],
  appHtml: ['./app_client/**/*.html', '!node_modules/**/*.*']
}

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('ts', function () {
  var tsResult = tsProject.src(paths.appJavascript)
                    .pipe(ts(tsProject));

  return tsResult.js
          .pipe(concat('app.js'))
          .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sass', function () {
  gulp.src(paths.appScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/assets/css'));
    // .pipe(minifyCss())
    //     .pipe(gulp.dest(function(file) {
    //         return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    // }));
});

gulp.task('images', function(){
  gulp.src(paths.appImage)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./public/assets/img'));
});

gulp.task('html', function() {
  return gulp.src(paths.appHtml)
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', ['ts', 'sass', 'images', 'html'],function(){
    gulp.watch(paths.appJavascript, ['ts']);
    gulp.watch(paths.appScss, ['sass']);
    gulp.watch(paths.appImage, ['images']);
    gulp.watch(paths.appHtml, ['html']);
});

gulp.task('default', ['watch', 'ts', 'sass']);
