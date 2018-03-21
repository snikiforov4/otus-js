process.on('uncaughtException', (err) => {
    if (typeof err !== "object") {
        console.log('A u insane throwing the literal?!')
    } else {
        console.log(err);
    }
});

class MyError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, MyError);
    }
}

setTimeout(
    () => console.log('Will this line be printed?'),
    20
);

setImmediate(() => {throw new MyError('Catch me if u can')});
setImmediate(() => {throw 'don\'t throw the literals'});


