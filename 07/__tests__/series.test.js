const series = require('../series');

test('call each function passed as argument', () => {
    expect.assertions(2);
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    return series(fn1, fn2).then(() => {
        expect(fn1).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled()
    });
});
