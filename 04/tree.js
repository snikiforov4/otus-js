const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');


// class WalkEmitter extends EventEmitter {}
// const fileWalker = new WalkEmitter();


function dirWalk(dirPath, action) {
    fs.readdirSync(dirPath).forEach(entry => {
        let entryPath = path.join(dirPath, entry);
        let entryStats = fs.statSync(entryPath);
        action(entryPath, entryStats);
        if (entryStats.isDirectory()) {
            dirWalk(entryPath, action);
        }
    });
}

const walkSync = function(basePath, action) {
    if (typeof basePath !== 'string') {
        throw TypeError('argument should be string');
    }
    basePath = path.normalize(basePath);
    let stats = fs.statSync(basePath);
    if (!stats.isDirectory()) {
        throw Error(`Path is not a directory: ${basePath}`)
    }
    action(basePath, stats);
    dirWalk(basePath, action);
};

exports.walkSync = walkSync;