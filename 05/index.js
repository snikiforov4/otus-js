const {Writable, Readable, Transform} = require('stream');


class RandomNumbers extends Readable {
    constructor(min = 1, max = 100) {
        super({objectMode: true});
        this._cnt = 0;
        this._max = 100;
        this._getNextNumber = function () {
            return Math.floor(Math.random() * (max - min) ) + min;
        };
    }

    _read() {
        const i = this._cnt++;
        if (i > this._max)
            this.push(null);
        else {
            this.push(this._getNextNumber());
        }
    }
}

class ImposterFirst extends Transform {
    constructor(imposter = 42) {
        super({readableObjectMode: true, writableObjectMode: true});
        this._wasFirst = false;
        this._imposter = imposter;
    }

    _transform(number, encoding, callback) {
        if (!this._wasFirst) {
            console.log(`imposter origin number ${number} to ${this._imposter}`);
            number = this._imposter;
            this._wasFirst = true;
        }

        callback(null, number);
    }

}


class NumbersPrinter extends Writable {
    constructor() {
        super({objectMode: true});
    }

    _write(number, encoding, callback) {
        console.log(`Received: ${number}`);
        callback();
    }

    _final(callback) {
        console.log(`NumberPrinter has finished writing numbers`);
        callback();
    }
}

const reader = new RandomNumbers();
const transformer = new ImposterFirst();
const writer = new NumbersPrinter();

reader.pipe(transformer).pipe(writer).on('finish', () => console.log('Done'));



