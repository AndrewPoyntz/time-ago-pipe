const gulp = require('gulp');
const typescript = require('gulp-typescript');

gulp.task('compile', function(){
	return gulp.src(['src/ts/**/*.ts'])
		.pipe(typescript())
		.pipe(gulp.dest('src/js/'));
});