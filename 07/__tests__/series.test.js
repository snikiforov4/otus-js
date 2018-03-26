const series = require('../series');

test('call each function passed as argument', () => {
    expect.assertions(2);
    const fn1 = jest.fn().mockImplementation(next => next()).mockName('fn1');
    const fn2 = jest.fn().mockImplementation(next => next()).mockName('fn2');
    return series(fn1, fn2).then(() => {
        expect(fn1).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled();
    });
});

test('directly call last function on passing any parameter to next()', () => {
    expect.assertions(4);
    const passed = jest.fn().mockImplementation(next => next()).mockName('passed');
    const skipped = jest.fn().mockImplementation(next => next()).mockName('skipped');
    const failed = jest.fn().mockImplementation(next => next('fail')).mockName('failed');
    const last = jest.fn().mockImplementation(next => next()).mockName('last');
    return series(passed, passed, failed, skipped, skipped, last).then(() => {
        expect(passed).toHaveBeenCalledTimes(2);
        expect(skipped).toHaveBeenCalledTimes(0);
        expect(failed).toHaveBeenCalledTimes(1);
        expect(last).toHaveBeenCalledTimes(1);
    });
});
