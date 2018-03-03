// Написать polyfill для функции Object.create.

function create(o = null) {
    let obj = {};
    obj.__proto__ = o;
    return obj;
}

let a1 = create({v: 'Test'});
let a2 = Object.create({v: 'Test'});
console.log(a1.v === a2.v);
// true

let b1 = create();
let b2 = Object.create(null);
console.log(b1.nonExistance === b2.nonExistance);
// true