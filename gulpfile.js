const { src, dest, series, parallel, watch } = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const del = require("del")
const pug = require("gulp-pug")
// const include = require("gulp-include");
const webpack = require("webpack-stream")
// const named = require("vinyl-named");
const sourcemaps = require("gulp-sourcemaps")
const browserSync = require("browser-sync").create()
const fs = require("fs/promises")
const path = require("path")
const svgSprite = require("gulp-svg-sprite")

const clean = path => cb => {
    del([path])
    cb()
}

const sync = () =>
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        ui: {
            port: 8080,
        },
    })

const svgSpriteTask = cb =>
    src("./src/assets/svg/*.svg")
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg", //sprite file name
                    },
                },
            }),
        )
        .pipe(dest("./dist"))

const jsTask = cb =>
    src("./src/js/main.js")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            webpack({
                mode: "development",
            }),
        )
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist"))

const pugTask = async () => {
    let dataFromFiles = await fs.readdir("./src/data")
    dataFromFiles = await dataFromFiles
        .filter(file => file.split(".").pop() === "json")
        .map(async file => {
            const raw = await fs.readFile(path.resolve("./src/data", file))
            return JSON.parse(raw)
        })
    dataFromFiles = await Promise.all(dataFromFiles)
    dataFromFiles = dataFromFiles.reduce((acc, e) => ({ ...acc, ...e }), {})

    src("./src/pug/**/*.pug")
        .pipe(
            pug({
                pretty: true,
                locals: dataFromFiles || {},
            }),
        )
        .pipe(dest("./dist"))
}

const sassTask = cb =>
    src("./src/style/style.sass")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist"))

const watchTask = () => {
    watch("./src/js/main.js", series(clean("./dist/main.js"), jsTask)).on(
        "change",
        browserSync.reload,
    )
    watch("./src/components/**/*", series(clean("./dist/*.html"), pugTask)).on(
        "change",
        browserSync.reload,
    )
    watch("./src/pug/**/*.pug", series(clean("./dist/*.html"), pugTask)).on(
        "change",
        browserSync.reload,
    )
    watch("./src/**/*.sass", series(clean("./dist/*.css"), sassTask)).on(
        "change",
        browserSync.reload,
    )
    watch("./src/data/**/*.json", series(clean("./dist/*.html"), pugTask)).on(
        "change",
        browserSync.reload,
    )
    watch(
        "./src/assets/svg/**/*.svg",
        series(clean("./dist/*.svg"), svgSpriteTask),
    ).on("change", browserSync.reload)
}

exports.js = jsTask

exports.watch = watchTask

exports.sprite = svgSpriteTask

exports.browserSync = parallel(sync, watchTask)

const defaultTask = parallel(
    series(clean("./dist/main.js"), jsTask),
    series(clean("./dist/*.html"), pugTask),
    series(clean("./dist/*.css"), sassTask),
    series(clean("./dist/*.svg"), svgSpriteTask),
)
exports.default = defaultTask
