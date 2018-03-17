const fs = require('fs');
const path = require('path');

const walk = function(dir) {
    let files = [], dirs = [];
    dirs.push(path.basename(dir));
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            let {dirs: d, files: f} = walk(fullPath);
            dirs.push(...d);
            files.push(...f);
        } else {
            files.push(file);
        }
    });
    return {dirs, files};
};

exports.walk = walk;