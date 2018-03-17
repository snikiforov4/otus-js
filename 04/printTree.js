const path = require("path");
const {walkSync} = require('./tree');

let baseDir = path.join(__dirname);

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