const {Writable, Readable, Transform} = require('stream');
const {RateLimiter} = require('limiter');

class RandomNumbers extends Readable {
    constructor(min = 1, max = 100) {
        super({highWaterMark: 10, objectMode: true});
        this._cnt = 0;
        this._max = 100;
        this._getNextNumber = function () {
            return Math.floor(Math.random() * (max - min) ) + min;
        };
    }

    _read() {
        if (++this._cnt > this._max)
            this.push(null);
        else {
            this.push(this._getNextNumber());
        }
    }
}

class ExchangeFirst extends Transform {
    constructor(imposter = 42) {
        super({readableObjectMode: true, writableObjectMode: true});
        this._wasFirst = false;
        this._imposter = imposter;
    }

    _transform(number, encoding, callback) {
        if (!this._wasFirst) {
            console.log(`exchange origin number ${number} to ${this._imposter}`);
            number = this._imposter;
            this._wasFirst = true;
        }
        callback(null, number);
    }
}

class NumberPrinter extends Writable {
    constructor() {
        super({highWaterMark: 10, objectMode: true});
        this._limiter = new RateLimiter(1, 250);
        this._received = 0;
    }

    _write(number, encoding, callback) {
        this._limiter.removeTokens(1, (err) => {
            if (err) callback(err);
            console.log(`number: ${number}, handled: ${++this._received}`);
            callback();
        });
    }
}

const reader = new RandomNumbers();
const transformer = new ExchangeFirst();
const writer = new NumberPrinter();

reader.pipe(transformer).pipe(writer).on('finish', () => console.log('Done'));



