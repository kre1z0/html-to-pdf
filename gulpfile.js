var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-include'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(autoprefixer({
            browsers: '> 3%'
        }))
        .pipe(gulp.dest('dist/static/bp_new1/'));
});

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist'));
});

gulp.task("js", function () {
    gulp.src("src/js/*.js")
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest("dist/static/bp_new1/"));
});

gulp.task("img", function () {
    gulp.src(['src/img/*.*'])
        .pipe(gulp.dest('dist/static/bp_new1/img'));
});

gulp.task("fonts", function () {
    gulp.src(['src/fonts/*.*'])
        .pipe(gulp.dest('dist/static/fonts/bp_new1/'));
});

gulp.task('serve', ['sass', 'html', 'js', 'img', 'fonts'], function () {

    browserSync.init({
        server: {
            baseDir: './dist/',
            directory: false
        },
        notify: false,
        tunnel: false,
        host: 'localhost',
        port: 7777,
        logPrefix: "msp-business-plan"
    });
    gulp.watch(["./src/scss/**/*.scss"], ['sass']);
    gulp.watch(["./dist/**/*.css"]).on('change', browserSync.reload);
    gulp.watch(["./src/js/*.js"], ['js']);
    gulp.watch(["./dist/**/*.js"]).on('change', browserSync.reload);
    gulp.watch(["./src/**/*.html"], ['html']);
    gulp.watch(["./dist/*.html"]).on('change', browserSync.reload);
    gulp.watch(['src/img/*.*'], ['img']);
    gulp.watch(["./dist/img/*.*"]).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('build:files', function () {
    //css
    gulp.src('dist/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/static/bp_new1/'));
    //js
    gulp.src('src/js/*.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    //img
    gulp.src(['src/img/*.gif', 'src/img/*.png', 'src/img/*.jpg'])
        .pipe(gulp.dest('dist/static/bp_new1/img'));
});

gulp.task('build', ['build:files'], function () {
    console.log('builded');
});
