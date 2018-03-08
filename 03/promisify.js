const fs = require('fs');

function promisify(toWrap) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            toWrap.apply(toWrap, [].concat(args, (err, res) => (err) ? reject(err) : resolve(res)))
        });
    }
}

// DEFAULT
fs.readFile(__filename, (err, data) => {
    if (err) throw err;
    console.log(data)
});

const promisedReadFile = promisify(fs.readFile);
promisedReadFile(__filename).then(data => console.log(data)).catch(err => console.log(`${err.message}`));


// SINGLE
fs.access(__filename, fs.constants.R_OK, (err) => {
    console.log(err ? 'no access!' : '👍')
});

const promisedAccess = promisify(fs.access);
promisedAccess(__filename, fs.constants.R_OK).then(() => console.log('👍')).catch(() => console.log('no access!'));