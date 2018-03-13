const fs = require('fs');

function promisify(original) {
    if (typeof original !== "function") {
        throw new TypeError('argument should be a function');
    }
    return (...args) => {
        return new Promise((resolve, reject) => {
            original.apply(original, [...args, (err, res) => (err) ? reject(err) : resolve(res)]);
        });
    }
}

const promisedAccess = promisify(fs.access);
promisedAccess(__filename, fs.constants.R_OK | fs.constants.W_OK)
    .then(() => console.log('👍')).catch(() => console.log('no access!'));

const promisedStat = promisify(fs.stat);
promisedStat(__filename).then(stats => console.log(`File has been changed at: ${stats.ctime}`)).catch(console.log);

const promisedReadFile = promisify(fs.readFile);
promisedReadFile(__filename, {encoding: 'utf8'}).then(data => console.log(data)).catch(console.log);
