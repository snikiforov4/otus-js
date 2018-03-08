const EventEmitter = require('events');

class LogEmitter extends EventEmitter {}
const logEmitter = new LogEmitter();

logEmitter.on('request', (req) => {
    console.log(`request={url=${req.url}, method=${req.method}}`);
});

module.exports.log = logEmitter;