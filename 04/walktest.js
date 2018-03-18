const path = require("path");
const {walk, WalkEmitter} = require('./tree');

const walkEmitter = new WalkEmitter();

let res = {dirs: [], files: []};
walkEmitter
    .onEntry((entry, stats) => {
        if (stats.isDirectory()) {
            res.dirs.push(entry);
        } else {
            res.files.push(entry);
        }
    })
    .onError(console.log)
    .onEnd(() => console.log(res));

let baseDir = path.join(__dirname);
walk(baseDir, walkEmitter);