const series = async function (...functions) {
    for (let nextFunction of functions) {
        nextFunction();
    }
};

module.exports = series;
