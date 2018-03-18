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
    .onFinish(() => console.log(res));

let baseDir = __dirname;
if (process.argv.length > 2) {
    baseDir = process.argv[2];
}
walk(baseDir, walkEmitter);