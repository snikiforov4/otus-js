// Написать polyfill для функции Object.create.

function create(proto = null, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object: ' + proto);
    }

    function F() {}
    F.prototype = proto;
    let obj = new F();

    for (let propertyName in propertiesObject) {
        if (propertiesObject.hasOwnProperty(propertyName)) {
            if (propertiesObject[propertyName].value) {
                obj[propertyName] = propertiesObject[propertyName].value;
            }
        }
    }

    return obj;
}

let propertiesObject = {
    p: {
        value: 42,
        writable: true,
        enumerable: true,
        configurable: true
    }
};

// Tests
let a1 = create({v: 'Test'}, propertiesObject);
let a2 = Object.create({v: 'Test'}, propertiesObject);
console.log(a1.v === a2.v);
// true
console.log(`a1.p=${a1.p}, a2.p=${a2.p}`);

let b1 = create();
let b2 = Object.create(null);
console.log(b1.nonExistance === b2.nonExistance && b1.nonExistance === undefined);
// true