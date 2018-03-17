const path = require("path");
let tree = require('./tree');

let baseDir = path.join(__dirname, 'node_modules');
console.log(tree.walk(baseDir));