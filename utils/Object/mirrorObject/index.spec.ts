import { mirrorObject } from './';

describe('mirrorObject', () => {
    const testCases: Record<string, unknown>[][] = [
        [{}, {}],
        [{ foo: 1 }, { foo: 'foo' }],
        [
            { foo: 4, bar: 7 },
            { foo: 'foo', bar: 'bar' },
        ],
    ];
    testCases.forEach(([obj, expectedResult]) => {
        it(`${JSON.stringify(obj)} -> ${String(expectedResult)}`, () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            expect(mirrorObject(obj!)).toEqual(expectedResult);
        });
    });
});
