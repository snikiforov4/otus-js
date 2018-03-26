const series = require('../series');

test('call each function passed as argument', () => {
    expect.assertions(2);
    const fn1 = jest.fn().mockImplementation(next => next()).mockName('fn1');
    const fn2 = jest.fn().mockImplementation(next => next()).mockName('fn2');
    return series(fn1, fn2).then(() => {
        expect(fn1).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled()
    });
});
