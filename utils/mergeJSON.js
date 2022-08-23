const fs = require("fs/promises");
const path = require("path");

async function merge() {
    let data = {};
    const allFiles = await fs.readdir(
        path.resolve(process.cwd(), "./src/data"),
    );
    const allJson = allFiles
        .map(file => {
            const ext = path.extname(file);
            if (ext === ".json") {
                const result = path.resolve(process.cwd(), "./src/data/", file);
                return result;
            }
        })
        .filter(Boolean);
    await Promise.all(
        allJson.map(async file => {
            try {
                let json = await fs.readFile(path.resolve(process.cwd(), file));
                json = JSON.parse(json);
                data = { ...data, ...json };
            } catch (error) {
                throw Error(`не получается прочитать файл ${file} - ${error}`);
            }
        }),
    );
    console.log(data);
    await fs.writeFile(
        path.resolve(process.cwd(), "./src/data/global.json"),
        JSON.stringify(data),
    );
}

console.log(process.argv[2], process.argv[3]);

merge();
