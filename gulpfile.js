var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('fonts', function(){
  gulp.src(['node_modules/angular-ui-grid/*.eot', 'node_modules/angular-ui-grid/*.woff','node_modules/angular-ui-grid/*.svg','node_modules/angular-ui-grid/*.ttf'])
  .pipe(gulp.dest('./src/fonts'));
});

gulp.task('js', function(){
  gulp.src('node_modules/angular-ui-grid/ui-grid.min.js')
  .pipe(gulp.dest('./src/js'));
});

gulp.task('variables', function(){
  gulp.src(['./node_modules/angular-ui-grid/less/variables.less','./node_modules/angular-ui-grid/less/main.less'])
  .pipe(gulp.dest('./src/less'))
});

gulp.task('less', function(){
  gulp.src('./src/less/main.less')
  .pipe(less())
  .pipe(minifyCss())
  .pipe(rename('./src/css/ui-grid.min.css'))
  .pipe(gulp.dest('./'))
});
