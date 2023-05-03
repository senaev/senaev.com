import { invertObject } from '.';

describe('invertObject', () => {
    it('simple case', () => {
        expect(invertObject({
            abc: 'def',
            ghi: 'jkl',
        })).toEqual({
            def: 'abc',
            jkl: 'ghi',
        });
        expect(invertObject({})).toEqual({});
    });

    it('duplicate keys', () => {
        expect(invertObject({
            abc: 'def',
            ghi: 'jkl',
            qwe: 'jkl',
        })).toEqual({
            def: 'abc',
            jkl: 'qwe',
        });
    });
});
