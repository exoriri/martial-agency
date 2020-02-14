const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const atImport = require("postcss-import")
const cssNested = require('postcss-nested');

const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');

gulp.task('css', () => {
    const plugins = [
        autoprefixer(),
        atImport(),
        cssNested(),
        cssnano()
    ];

    return gulp.src('./src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest/css'))
});

gulp.task('pug', () => {
    return gulp.src('./src/views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dest/'));
});

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dest/fonts/'));
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
        .pipe(gulp.dest('./dest/images'))
});

gulp.task('filesWatch', (done) => {
    browserSync.reload('./dest/**/*.html');
    done();
});

gulp.task('serve', gulp.series('pug', 'css', 'images', 'fonts', () => {
    browserSync.init({
        server: './dest/',
        port: 3000,
    });

    gulp.watch('src/css/**/*.css', gulp.series('css'));
    gulp.watch('src/views/**/*.pug', gulp.series('pug'));
    gulp.watch('src/fonts/**/*', gulp.series('images'));
    gulp.watch('src/views/**/*', gulp.series('fonts'));
    gulp.watch('./dest/**/*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));