const series = async function (...functions) {
    if (functions.length > 0) {
        return new Promise(resolve => {
            innerFunctionCall(...functions);
            resolve();
        });
    }
};

const innerFunctionCall = function (...restFunctions) {
    const nextFunction = restFunctions.shift();
    return nextFunction(next(...restFunctions));
};

const next = function (...restFunctions) {
    return function () {
        if (arguments.length > 0) {
            if (restFunctions.length > 0) {
                return innerFunctionCall(restFunctions[restFunctions.length - 1]);
            }
        } else {
            if (restFunctions.length > 0) {
                return innerFunctionCall(...restFunctions);
            }
        }
    }
};

module.exports = series;
