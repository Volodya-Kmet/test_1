var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var merge = require('merge-stream');
const img = require('gulp-image');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});


gulp.task('mergedStream', function () {

    var scssStream = gulp.src(['src/sass/**/*.scss'])
        .pipe(sass());

    var cssStream = gulp.src(['src/CSS/**/*.css']);

    var mergedStream = merge(scssStream, cssStream)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'));

    return mergedStream;
});

gulp.task('pug', function () {
    return gulp.src('src/views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('build/js'))
});

gulp.task('img', function () {
    return gulp.src('src/image/**/*')
        .pipe(img())
        .pipe(gulp.dest('build/image'))
})

gulp.task('build', ['pug', 'mergedStream', 'js', 'img'])

gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/image/**/*', ['img']);
    gulp.watch('src/views/**/*.pug', ['pug']);
    gulp.watch('src/sass/**/*.scss', ['mergedStream']);
})

gulp.task('default', ['build', 'watch', 'browser-sync'])
