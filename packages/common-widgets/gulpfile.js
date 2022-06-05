const gulp = require('gulp');
const ts = require('gulp-typescript');

const esm = ts.createProject('../../tsconfig.json');

function esmBuild() {
    return gulp.src('utils/**/*.{ts,tsx}').pipe(esm()).pipe(gulp.dest('esm'));
}

const umd = ts.createProject('../../tsconfig.json', { module: 'umd' });

function umdBuild() {
    return gulp.src('utils/**/*.{ts,tsx}').pipe(umd()).pipe(gulp.dest('umd'));
}

const cjs = ts.createProject('../../tsconfig.json', { module: 'commonjs' });

function cjsBuild() {
    return gulp.src('utils/**/*.{ts,tsx}').pipe(cjs()).pipe(gulp.dest('cjs'));
}

gulp.task('build', gulp.parallel(esmBuild, umdBuild, cjsBuild));
