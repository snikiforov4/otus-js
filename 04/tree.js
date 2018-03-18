const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');


class WalkEmitter extends EventEmitter {
    onEntry(onEntryFunction) {
        if (typeof onEntryFunction !== 'function') {
            throw TypeError('argument should be function');
        }
        this.on('entry', onEntryFunction);
        return this;
    };

    onError(onErrorFunction) {
        if (typeof onErrorFunction !== 'function') {
            throw TypeError('argument should be function');
        }
        this.on('error', onErrorFunction);
        return this;
    };

    onEnd(onEndFunction) {
        if (typeof onEndFunction !== 'function') {
            throw TypeError('argument should be function');
        }
        this.on('end', onEndFunction);
        return this;
    };
}


function dirWalkSync(dirPath, action) {
    fs.readdirSync(dirPath).forEach(entry => {
        let entryPath = path.join(dirPath, entry);
        let entryStats = fs.statSync(entryPath);
        action(entryPath, entryStats);
        if (entryStats.isDirectory()) {
            dirWalkSync(entryPath, action);
        }
    });
}

const walkSync = function (basePath, action) {
    if (typeof basePath !== 'string') {
        throw TypeError('argument should be string');
    }
    basePath = path.normalize(basePath);
    let stats = fs.statSync(basePath);
    if (!stats.isDirectory()) {
        throw Error(`Path is not a directory: ${basePath}`)
    }
    action(basePath, stats);
    dirWalkSync(basePath, action);
};

function dirWalk(dirPath, stats, walkEmitter, doneCnt) {
    walkEmitter.emit('entry', dirPath, stats);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            walkEmitter.emit('error', err);
            return;
        }
        files.forEach(entry => {
            let entryPath = path.join(dirPath, entry);
            doneCnt[0]++;
            fs.stat(entryPath, (err, entryStats) => {
                if (err) {
                    walkEmitter.emit('error', err);
                    return;
                }
                if (entryStats.isDirectory()) {
                    dirWalk(entryPath, entryStats, walkEmitter, doneCnt);
                } else {
                    doneCnt[0]--;
                    walkEmitter.emit('entry', entryPath, entryStats);
                }
            });
        });
        if (--doneCnt[0] === 0) {
            walkEmitter.emit('end');
        }
    });
}

const walk = function (basePath, walkEmitter) {
    if (typeof basePath !== 'string') {
        throw TypeError('argument should be string');
    }
    basePath = path.normalize(basePath);
    fs.stat(basePath, (err, stats) => {
        if (err) {
            walkEmitter.emit('error', err);
            return;
        }
        if (!stats.isDirectory()) {
            walkEmitter.emit('error', Error(`Path is not a directory: ${basePath}`));
            return;
        }
        let doneCnt = [1];
        dirWalk(basePath, stats, walkEmitter, doneCnt)
    });
};

exports.WalkEmitter = WalkEmitter;
exports.walk = walk;
exports.walkSync = walkSync;