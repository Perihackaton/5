var gulp = require('gulp'),
	vulcanize = require('gulp-vulcanize'),
	crisper = require('gulp-crisper');

gulp.task('default', function(){
	gulp.run('vulcanize','copy');
	});

gulp.task('vulcanize', function(){
	return gulp.src('imports.html')
		.pipe(vulcanize({
			inlineCss: true,
			inlineScripts: true
			}))
		// .pipe(crisper())
		.pipe(gulp.dest('../www'));
	});

gulp.task('copy', function(){
	return gulp.src(['index.html', 'main.css', 'main.js'])
		.pipe(gulp.dest('../www'));
	});