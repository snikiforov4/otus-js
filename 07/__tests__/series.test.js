const series = require('../series');

test('call each function passed as argument', () => {
    expect.assertions(2);
    const fn1 = jest.fn().mockImplementation(next => next()).mockName('fn1');
    const fn2 = jest.fn().mockImplementation(next => next()).mockName('fn2');
    return series(fn1, fn2).then(() => {
        expect(fn1).toHaveBeenCalledTimes(1);
        expect(fn2).toHaveBeenCalledTimes(1);
    });
});

test('skip rest of functions and call last function if any parameter was passed to next()', () => {
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

test('skip rest of functions if next() was not called', () => {
    expect.assertions(3);
    const passed = jest.fn().mockImplementation(next => next()).mockName('passed');
    const skippedCallingNext = jest.fn().mockName('doesNotCallNext');
    const skipped = jest.fn().mockImplementation(next => next()).mockName('skipped');
    return series(passed, passed, skippedCallingNext, skipped, skipped).then(() => {
        expect(passed).toHaveBeenCalledTimes(2);
        expect(skippedCallingNext).toHaveBeenCalledTimes(1);
        expect(skipped).toHaveBeenCalledTimes(0);
    });
});

test('return resolved promise if no one function was passed', async () => {
    expect.assertions(1);
    await expect(series()).resolves.toBe(undefined);
});

test('return rejected promise on error', async () => {
    expect.assertions(3);
    const common = jest.fn().mockImplementation(next => next()).mockName('common');
    const failed = jest.fn().mockImplementation(() => {throw new Error('error')}).mockName('failed');
    await expect(series(common, common, failed, common, common)).rejects.toThrowError('error');
    expect(common).toHaveBeenCalledTimes(2);
    expect(failed).toHaveBeenCalledTimes(1);
});
