import { tryStringify } from './';

describe('tryStringify', () => {
    it('should be equal JSON.stringify() for serializable object', () => {
        const testObj: Record<string, unknown> = {
            foo: 'bar',
            baz: 1,
            a: null,
            b: undefined,
            array: ['foo', 'bar', 'baz', 1, 2, 3],
            foobar() {
                return 0;
            },
        };

        const attempt = tryStringify(testObj);
        delete testObj.foobar; // function is not stringifiable
        expect(attempt).toEqual(JSON.stringify(testObj));
    });

    it('should return undefined for object with cyclic references', () => {
        const testObj: Record<string, unknown> = {
            foo: 'bar',
            baz: null,
        };
        testObj.baz = testObj;

        expect(tryStringify(testObj)).toEqual(undefined);
    });

    it('should return undefined for `undefined`', () => {
        expect(tryStringify(undefined)).toEqual(undefined);
    });
});
