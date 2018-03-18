const path = require("path");
const {walkSync} = require('./tree');

let baseDir = __dirname;
if (process.argv.length > 2) {
    baseDir = process.argv[2];
}

walkSync(baseDir, (e, stats) => {
    if (baseDir === e) {
        console.log(baseDir);
        return;
    }
    let relativePath = path.relative(baseDir, e);
    let tab = '  '.repeat(relativePath.split(path.sep).length);
    if (stats.isDirectory()) {
        console.log(`${tab}${relativePath}${path.sep}`);
    } else {
        console.log(`${tab}${relativePath}`);
    }
});