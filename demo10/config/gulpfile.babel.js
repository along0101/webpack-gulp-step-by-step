import gulp from 'gulp';

import babel from 'gulp-babel';

import del from 'del';

import fileInclude from 'gulp-file-include';

import sass from 'gulp-sass';

import concat from 'gulp-concat';
import rev from 'gulp-rev';
import browserSync from 'browser-sync';

//import rename from 'gulp-rename';
//import uglify from 'gulp-uglify';
//import minifyCss from 'gulp-minify-css';
//import cleanCSS from 'gulp-clean-css';
//import changed from 'gulp-changed';
//import debug from 'gulp-debug';

const paths = {
  styles: {
    src: 'src/styles/**/*.less',
    dest: 'assets/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/scripts/'
  }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

/*
 * You can still use `gulp.task`
 * for example to set task names that would otherwise be invalid
 */
const clean = gulp.series(clean, gulp.parallel(styles, scripts));
gulp.task('clean', clean);

/*
 * Export a default task
 */
export default build;
