const { src, dest } = require("gulp")
const through2 = require("through2")
const gutil = require("gulp-util")
const fs = require("fs")
const path = require("path")

const task = async () => {
    src("./src/pug/index.pug")
        .pipe(
            through2.obj(function (file, _, cb) {
                console.log("file>>", file.cwd, file.path)
                const iterator = file.contents
                    .toString()
                    .matchAll(/(?<=img\().*(src="(.*?)").*(?=\))/g)
                let files = [...iterator].map(e => e[2])
                for (let i of files) {
                    console.log(path.resolve(file.cwd, i), file.base)
                    const data = fs.readFileSync(path.resolve(file.cwd, i))
                    console.log("🚀 ~ data", data)

                    this.push(
                        new gutil.File({
                            base: file.base,
                            cwd: file.cwd,
                            path: path.resolve(file.cwd, i),
                            contents: data,
                        }),
                    )
                }
                // this.push(file)
            }),
        )
        .pipe(dest("./used"))
}

exports.default = task
