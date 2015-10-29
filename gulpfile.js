var gulp  = require('gulp'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCss = require('gulp-minify-css'),
    fontmin = require('gulp-fontmin'),
    rename = require('gulp-rename'),
    svgmin = require('gulp-svgmin');

gulp.task('watch', function(){
    var watcher = gulp.watch('js/*.js');
    watcher.on('change', function(event){
        console.log("File:" + event.path + " was changes ");
    });
});

gulp.task('imagemin', function(){
    return gulp.src('img/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('uglify', function(){
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyCss', function(){
    return gulp.src('css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('svgmin', function(){
    return gulp.src('img/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/svg'));
});

gulp.task('fontmin', function(){
    return gulp.src('fonts/*')
        .pipe(fontmin())
        .pipe(gulp.dest('dist/fonts'));
});

