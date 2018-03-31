require("date-format-lite");
const express = require('express');

const nowTimeAsString = function () {
    return new Date().format("hh:mm:ss");
};

exports.requestTimeLog = (function () {
    const router = express.Router();
    router.use(function requestTimeLog(req, res, next) {
        console.log(`${nowTimeAsString()} method=${req.method} path=${req.path} params=${JSON.stringify(req.query)}`);
        next()
    });
    return router;
})();
