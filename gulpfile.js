const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const pug = require("gulp-pug");
// const include = require("gulp-include");
const webpack = require("webpack-stream");
// const named = require("vinyl-named");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const fs = require("fs");

const clean = path => cb => {
    del([path]);
    cb();
};

const dataFromFile = JSON.parse(fs.readFileSync("./src/data.json"));

const sync = () =>
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        ui: {
            port: 8080,
        },
    });

const jsTask = cb =>
    src("./src/js/main.js")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            webpack({
                mode: "development",
            }),
        )
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist"));

const pugTask = cb =>
    src("./src/pug/index.pug")
        .pipe(
            pug({
                pretty: true,
                locals: dataFromFile || {},
            }),
        )
        .pipe(dest("./dist"));

const sassTask = cb =>
    src("./src/style/style.sass")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist"));

const watchTask = () => {
    watch("./src/js/main.js", series(clean("./dist/main.js"), jsTask)).on(
        "change",
        browserSync.reload,
    );
    watch("./src/components/**/*", series(clean("./dist/*.html"), pugTask)).on(
        "change",
        browserSync.reload,
    );
    watch("./src/pug/*", series(clean("./dist/*.html"), pugTask)).on(
        "change",
        browserSync.reload,
    );
    watch("./src/**/*.sass", series(clean("./dist/*.css"), sassTask)).on(
        "change",
        browserSync.reload,
    );
};

exports.js = jsTask;

exports.watch = watchTask;

exports.browserSync = parallel(sync, watchTask);

const defaultTask = parallel(
    series(clean("./dist/main.js"), jsTask),
    series(clean("./dist/*.html"), pugTask),
    series(clean("./dist/*.css"), sassTask),
);
exports.default = defaultTask;
