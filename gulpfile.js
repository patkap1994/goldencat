const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
 
gulp.task('default', function () {
    return gulp.src('src/img/gallery/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img/gallery'));
});

gulp.task('uglify', function() {
    return gulp.src('src/css/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});