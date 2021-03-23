const { shallowCopy, deepCopy } = require('../src/copy')

describe('oject copy test', () => {
    test('shallow copy', () => {
        const source = [{ name: 'dp' }, 0, 2, 3, 4, 5]
        const target = shallowCopy(source);

        source[0].name = 'xq'

        expect(target).not.toBe(source)
        expect(target[0].name).toEqual('xq')
    });


    test('deep copy', () => {
        const source = [{ name: 'dp' }, 0, 2, 3, 4, 5]
        const target = deepCopy(source);

        source[0].name = 'xq'

        expect(target).not.toBe(source)
        expect(target[0].name).toEqual('dp')
    });

    test('deep copy in funtion', () => {
        const fn = () => { }
        const source = [fn, { name: 'dp' }, 0, 2, 3, 4, 5]
        const target = deepCopy(source);

        source[0] = ''

        expect(target).not.toBe(source)
        expect(target[0]).not.toBe('')
    });
});