const series = require('../series');

test('call each function passed as argument', () => {
    expect.assertions(1);
    const res = [];
    return series(() => res.push(1), () => res.push(2))
        .then(() => expect(res).toEqual([1, 2]));
});
