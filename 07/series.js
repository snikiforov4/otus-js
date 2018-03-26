const series = async function (...functions) {
    if (functions.length > 0) {
        return new Promise(resolve => {
            innerFunctionCall(...functions);
            resolve();
        });
    }
};

const innerFunctionCall = function (...restFunctions) {
    console.log("inner");
    return restFunctions.shift()(next(restFunctions));
};

const next = function (...restFunctions) {
    return function () {
        if (arguments.length > 0) {
            if (restFunctions.length > 0) {
                return restFunctions[restFunctions.length - 1]([]);
            } else {
                let err = arguments[0];
                return Promise.reject(err);
            }
        } else {
            if (restFunctions.length > 0) {
                return innerFunctionCall(...restFunctions);
            }
        }
    }
};

module.exports = series;
