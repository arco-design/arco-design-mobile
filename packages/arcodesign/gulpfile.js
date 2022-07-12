const gulp = require('gulp');
const childProcess = require('child_process');
const path = require('path');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const replace = require('gulp-replace');
const NpmImportPlugin = require('less-plugin-npm-import');
const fs = require('fs-extra');
const { changeBabelModule } = require('./pack-util');

const dts = ts.createProject('../../tsconfig.json', { emitDeclarationOnly: true });
const allCss = [];
const allCssEntry = [];

function dtsBuild() {
    return gulp
        .src('components/**/*.{ts,tsx}')
        .pipe(dts())
        .pipe(gulp.dest('esm'))
        .pipe(gulp.dest('umd'))
        .pipe(gulp.dest('cjs'));
}

function esmBuild() {
    return gulp
        .src('components/**/*.{ts,tsx}')
        .pipe(babel(changeBabelModule(false)))
        .pipe(gulp.dest('esm'));
}

function umdBuild() {
    return gulp
        .src('components/**/*.{ts,tsx}')
        .pipe(babel(changeBabelModule('umd')))
        .pipe(gulp.dest('umd'));
}

function cjsBuild() {
    return gulp
        .src('components/**/*.{ts,tsx}')
        .pipe(babel(changeBabelModule('cjs')))
        .pipe(gulp.dest('cjs'));
}

function copyLess() {
    return gulp
        .src('components/**/*.less')
        .pipe(gulp.dest('esm'))
        .pipe(gulp.dest('umd'))
        .pipe(gulp.dest('cjs'));
}

function buildStyle(src) {
    return gulp
        .src(src)
        .pipe(
            less({
                javascriptEnabled: true,
                plugins: [new NpmImportPlugin({ prefix: '~' })],
            }),
        )
        .pipe(
            postcss([
                autoprefixer({
                    overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7.0'],
                }),
            ]),
        );
}

function lessBuild() {
    return buildStyle('components/**/*.less').pipe(
        gulp.dest(file => {
            allCss.push(file.relative);
            return '_temp_style_';
        }),
    );
}

function entryLessBuild() {
    return buildStyle('style/public.less').pipe(gulp.dest('style/css'));
}

function moveCss() {
    try {
        allCss.forEach(file => {
            ['esm', 'umd', 'cjs'].forEach(type => {
                const filePath = path.join('_temp_style_', file);
                const newPath = path.join(type, path.dirname(file), 'css');
                fs.mkdirpSync(newPath);
                fs.copySync(filePath, path.join(newPath, path.basename(file)));
            });
        });
        fs.removeSync('_temp_style_');
    } catch (e) {
        console.error(e);
        fs.removeSync('_temp_style_');
    }
    return Promise.resolve();
}

function buildCssEntry(type) {
    return () =>
        gulp
            .src([`${type}/**/style/index.js`, `${type}/**/style/index.d.ts`])
            .pipe(replace(/\/style/g, '/style/css'))
            .pipe(replace(/\.less/g, '.css'))
            .pipe(replace(/(['"])\.\.\//g, '$1../../'))
            .pipe(
                gulp.dest(file => {
                    allCssEntry.push(file.relative);
                    return `_temp_style_entry_/${type}`;
                }),
            );
}

function moveCssEntry() {
    try {
        allCssEntry.forEach(file => {
            ['esm', 'umd', 'cjs'].forEach(type => {
                const filePath = path.join('_temp_style_entry_', type, file);
                const newPath = path.join(type, path.dirname(file), 'css');
                fs.mkdirpSync(newPath);
                fs.copySync(filePath, path.join(newPath, path.basename(file)));
            });
        });
        fs.removeSync('_temp_style_entry_');
    } catch (e) {
        console.error(e);
        fs.removeSync('_temp_style_entry_');
    }
    return Promise.resolve();
}

gulp.task(
    'build',
    gulp.series(
        gulp.parallel(dtsBuild, esmBuild, umdBuild, cjsBuild), // js 部分编译打包
        copyLess, // 复制less文件到产物中
        gulp.parallel(lessBuild, entryLessBuild), // 编译less文件为css
        moveCss, // css产物放到css文件夹中
        ...['esm', 'umd', 'cjs'].map(type => buildCssEntry(type)), // css中的js入口生成
        moveCssEntry, // css入口js放到css文件夹中
    ),
);
