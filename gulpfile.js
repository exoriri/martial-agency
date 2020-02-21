const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const atImport = require("postcss-import")
const cssNested = require('postcss-nested');

const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');

gulp.task('libs', () => {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./build/libs'))
});

gulp.task('css', () => {
    const plugins = [
        autoprefixer(),
        atImport(),
        cssNested(),
        cssnano()
    ];

    return gulp.src('./src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('pug', () => {
    return gulp.src('./src/views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./build/images'))
});

gulp.task('filesWatch', (done) => {
    browserSync.reload('./build/**/*.html');
    done();
});

gulp.task('serve', gulp.series('pug', 'css', 'images', 'fonts', 'libs', () => {
    browserSync.init({
        server: './build/',
        port: 3000,
    });

    gulp.watch('src/css/**/*.css', gulp.series('css'));
    gulp.watch('src/views/**/*.pug', gulp.series('pug'));
    gulp.watch('src/images/**/*', gulp.series('images'));
    gulp.watch('src/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/libs/**/*', gulp.series('libs'));
    gulp.watch('./build/**/*').on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('pug', 'css', 'images', 'fonts', 'libs'));
gulp.task('default', gulp.series('serve'));