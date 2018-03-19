const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

function checkType(argument, type) {
    if (typeof argument !== type) {
        throw TypeError(`argument should be a ${type}`);
    }
}

class Counter {
    constructor(initValue = 0) {
        this.i = initValue;
    }

    get() {
        return this.i;
    }

    increment() {
        this.i++;
        return this.i;
    }

    decrement() {
        this.i--;
        return this.i;
    }
}

class WalkEmitter extends EventEmitter {
    onEntry(onEntryFunction) {
        checkType(onEntryFunction, 'function');
        this.on('entry', onEntryFunction);
        return this;
    };

    onError(onErrorFunction) {
        checkType(onErrorFunction, 'function');
        this.on('error', onErrorFunction);
        return this;
    };

    onFinish(onEndFunction) {
        checkType(onEndFunction, 'function');
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
    checkType(basePath, 'string');
    basePath = path.normalize(basePath);
    let stats = fs.statSync(basePath);
    if (!stats.isDirectory()) {
        throw Error(`Path is not a directory: ${basePath}`)
    }
    action(basePath, stats);
    dirWalkSync(basePath, action);
};

function checkAndEmitEnd(doneCnt, emitter) {
    if (doneCnt.get() === 0) {
        emitter.emit('end');
    }
}

function handleError(err, emitter, counter) {
    emitter.emit('error', err);
    counter.decrement();
    checkAndEmitEnd(counter, emitter);
}

function dirWalk(dirPath, stats, walkEmitter, doneCnt) {
    walkEmitter.emit('entry', dirPath, stats);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            handleError(err, walkEmitter);
            return;
        }
        files.forEach(entry => {
            let entryPath = path.join(dirPath, entry);
            doneCnt.increment();
            fs.stat(entryPath, (err, entryStats) => {
                if (err) {
                    handleError(err, walkEmitter);
                    return;
                }
                if (entryStats.isDirectory()) {
                    dirWalk(entryPath, entryStats, walkEmitter, doneCnt);
                } else {
                    doneCnt.decrement();
                    walkEmitter.emit('entry', entryPath, entryStats);
                }
                checkAndEmitEnd(doneCnt, walkEmitter);
            });
        });
        doneCnt.decrement();
        checkAndEmitEnd(doneCnt, walkEmitter);
    });
}

const walk = function (basePath, walkEmitter) {
    checkType(basePath, 'string');
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
        dirWalk(basePath, stats, walkEmitter, new Counter(1))
    });
};

exports.WalkEmitter = WalkEmitter;
exports.walk = walk;
exports.walkSync = walkSync;
