const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const pug = require("gulp-pug");
const webpack = require("webpack-stream");
const sourcemaps = require("gulp-sourcemaps");
const fs = require("fs/promises");
const { readFileSync } = require("fs");
const path = require("path");
const svgSprite = require("gulp-svg-sprite");
const through2 = require("through2");
const Vinyl = require("vinyl");
const server = require("gulp-server-livereload");

const injectJSON = async () => {
    let dataFromFiles = await fs.readdir("./src/data");
    dataFromFiles = await dataFromFiles
        .filter(file => file.split(".").pop() === "json")
        .map(async file => {
            const raw = await fs.readFile(path.resolve("./src/data", file));
            return JSON.parse(raw);
        });
    dataFromFiles = await Promise.all(dataFromFiles);
    return dataFromFiles.reduce((acc, e) => ({ ...acc, ...e }), {});
};

const clean = path => cb => {
    del([path]);
    cb();
};

const svgSpriteTask = cb =>
    src("./src/assets/svg/**/*.svg")
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg", //sprite file name
                    },
                },
            }),
        )
        .pipe(dest("./dist"));

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

const pugTask = async () => {
    const json = await injectJSON();
    src("./src/pug/*.pug")
        .pipe(
            pug({
                pretty: true,
                locals: json || {},
            }),
        )
        .pipe(
            through2.obj(function (file, _, cb) {
                console.log("🚀 ~ file", file.path);
                const iterator = file.contents
                    .toString()
                    .matchAll(/(?<=<img).*(src="(.*?)").*(?=>)/g);
                let files = [...iterator].map(e => e[2]);
                for (let i of files) {
                    const pathImg = path.resolve(
                        file.history[file.history.length - 2],
                        i,
                    );
                    const data = readFileSync(pathImg);
                    this.push(
                        new Vinyl({
                            base: file.base,
                            cwd: file.cwd,
                            path: path.resolve(
                                file.base,
                                "." + pathImg.split("src")[1], //не нравиттся, найти способ получить разницу в пути между источником и целью
                            ),
                            contents: data,
                        }),
                    );
                }
                cb(null, file);
            }),
        )
        .pipe(dest("./dist"));
};

const sassTask = cb =>
    src("./src/style/style.sass")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist"));

const watchTask = () => {
    watch("./src/js/*.js", series(clean("./dist/main.js"), jsTask));
    watch("./src/components/**/*", series(clean("./dist/*.html"), pugTask));
    watch("./src/pug/**/*.pug", series(clean("./dist/*.html"), pugTask));
    watch("./src/**/*.sass", series(clean("./dist/*.css"), sassTask));
    watch("./src/data/**/*.json", series(clean("./dist/*.html"), pugTask));
    watch(
        "./src/assets/svg/**/*.svg",
        series(clean("./dist/*.svg"), svgSpriteTask),
    );
};

// exports.sync = sync;

exports.js = jsTask;

exports.pug = pugTask;

exports.watch = watchTask;

exports.sprite = svgSpriteTask;

exports.watch = watchTask;

// exports.browserSync = parallel(sync, watchTask);

const reload = () => {
    src("./dist/").pipe(
        server({
            livereload: true,
            directoryListing: {
                path: "./dist",
            },
            port: 9100,
        }),
    );
};

const defaultTask = parallel(
    series(clean("./dist/main.js"), jsTask),
    series(clean("./dist/*.html"), pugTask),
    series(clean("./dist/*.css"), sassTask),
    series(clean("./dist/*.svg"), svgSpriteTask),
);
exports.default = defaultTask;

exports.reload = reload;

exports.livereload = series(defaultTask, parallel(reload, watchTask));
