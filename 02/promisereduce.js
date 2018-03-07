
async function promiseReduce(promises, accumulator, initialValue) {
    let result = initialValue;
    for (let promise of promises) {
        await promise().then(v => result = accumulator(result, v));
    }
    return result;
}



let promises = [
    () => new Promise(resolve => setTimeout(() => resolve('Promises'), 500)),
    () => Promise.resolve('are'),
    () => new Promise(resolve => setTimeout(() => resolve('not'), 300)),
    () => Promise.resolve('so easy'),
];
promiseReduce(promises, (p, c) => p ? `${p} ${c}` : c)
    .then(v => console.log(v));
// Promises are not so easy

let numbers = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 500)),
    () => Promise.resolve(2),
    () => new Promise(resolve => setTimeout(() => resolve(3), 300)),
    () => Promise.resolve(4),
];
promiseReduce(numbers, (p, c) => p ? p + c : c, 28)
    .then(v => console.log(v));
// 42
