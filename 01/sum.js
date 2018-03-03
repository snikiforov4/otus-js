// Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом.
// Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.

// sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n



function sum(num) {
    if (num) {
        if (typeof num !== 'number') {
            throw new TypeError("passed argument is not a number");
        }
        return (n) => n ? sum(n + num) : num;
    } else {
        return 0;
    }

}

console.log(sum());
// 0
console.log(sum(11)(2)(7)(6)(8)(8)());
// 42
// console.log(sum('1')());
// TypeError