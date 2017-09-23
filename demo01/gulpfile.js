const gulp = require('gulp');
const concat = require('gulp-concat');


gulp.task('concat',function(){
	gulp.src('modules/*.js')
	.pipe(concat('output-name.js'))
	.pipe(gulp.dest('dist'));
});
