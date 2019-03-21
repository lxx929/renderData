/*
 * @Author: 刘祥祥 
 * @Date: 2019-03-21 08:45:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-21 09:49:10
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('gulp-webserver');

const fs = require('fs');
const url = require('url');
const path = require('path');

const list = require('./src/data/data.json');

gulp.task('scss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(server({
            port: 8789,
            open: true,
            livereload: true,
            middleware: (req, res, next) => {
                let { pathname, query } = url.parse(req.url, true); //解构

                if (pathname === '/favicon.ico') {
                    return res.end('');
                } else if (pathname === '/api/getData') {
                    res.end(JSON.stringify({ code: 1, data: list, message: 'success' }));
                } else {
                    pathname = pathname === '/' ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }));
});

gulp.task('default', gulp.series('scss', 'server', 'watch'));