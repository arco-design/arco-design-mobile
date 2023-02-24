const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));

gulp.task('es6', () => {
    const { app } = argv;
    const filePath = path.join(process.cwd(), 'app/', app, 'default/index.js');
    const destPath = path.join(process.cwd(), 'app', app, 'default');
    return gulp
        .src(filePath)
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(gulp.dest(destPath));
});
