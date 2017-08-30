'use strict';

//gulp核心
const gulp = require('gulp');
//const rename = require('gulp-rename');
//js/css合并
const concat = require('gulp-concat');
//压缩css
const minifyCss = require('gulp-minify-css');

const rev = require('gulp-rev');

const htmlBeautify = require('gulp-html-beautify');

//html文件合并
const fileinclude = require('gulp-file-include');

//浏览器同步刷新--
const browserSync = require('browser-sync').create();

//sass编译包
const sass = require('gulp-sass');



const paths = {
  styles: {
    src: 'src/**/scss/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: 'src/**/js/*.js',
    dest: './dist/js/'
  }
}

function compileCss(ev) {
  if (ev.type === 'changed') {
    //测试通过，编译 //return
    gulp.src("src/**/scss/*.scss") //获取源文件
      .pipe(sass().on('error', sass.logError)) //编译
      .pipe(concat('app.css')) //合并
      .pipe(rev()) //添加版本号
      .pipe(minifyCss()) //最小化
      .pipe(gulp.dest("./dist/css")); //输出目录
    //.pipe(browserSync.stream());
  }
}

function combineHtml(ev) {
  if (ev.type === 'changed') {
    gulp.src(['./src/home/index.html'])
      .pipe(fileinclude())
      .pipe(gulp.dest('./dist/'));
    //browserSync.reload
  }
}


gulp.task('combineHtml',function(){
  gulp.src(['./src/home/index.html','./src/article/detail.html'])
    .pipe(fileinclude())
    .pipe(htmlBeautify())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('serve', ['watcher'], function() {

  browserSync.init({
    // server: {
    // 	baseDir: "./"
    // }
    server: './dist'
  });

  gulp.watch('./dist/index.html').on('change', browserSync.reload);

});

// Static server
// gulp.task('browser-sync', function() {
//     var files = [
//     '**/*.html',   // 监听html
//     '**/*.css', // 监听css
//     '**/*.js' // 监听js
//     ];
//     browserSync.init(files,{
//         server: {
//             baseDir: "./"
//         }
//     });
// });

//gulp.watch("app/scss/*.scss", ['sass']);
//gulp.watch("app/*.html").on('change', browserSync.reload);

//https://github.com/gulpjs/gulp/tree/4.0
//https://www.npmjs.com/package/run-sequence
//https://browsersync.io/docs/gulp/


gulp.task('watcher', function() {
  //监听scss变化
  gulp.watch('src/**/scss/*.scss').on('change', compileCss);
  //监听html文档变化
  gulp.watch('src/**/*.html').on('change', combineHtml);

});

gulp.task('build', function() {

});



gulp.task('default', ['serve']);



const babel = require('gulp-babel');
const env = require('babel-preset-env');



gulp.task('babel',function(){
  gulp.src('./src/test.js')
  .pipe(babel({
            presets: ['env']
        }))
  .pipe(gulp.dest('dist'));
});
