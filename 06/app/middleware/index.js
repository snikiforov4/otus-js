require("date-format-lite");

const nowTimeAsString = function () {
    return new Date().format("hh:mm:ss");
};

const requestLogger = function (req, res, next) {
    console.log(`${nowTimeAsString()} method=${req.method} path=${req.path} params=${JSON.stringify(req.query)}`);
    next()
};

const errorHandler = function (err, req, res, next) {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: 'Internal server error!'});
};

exports.requestLogger = requestLogger;
exports.errorHandler = errorHandler;