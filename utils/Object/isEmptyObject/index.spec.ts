import {
    describe,
    expect,
    it,
} from 'vitest';
import { isEmptyObject } from '.';

describe('isEmptyObject', () => {
    const testCases = [
        {
            input: {},
            output: true,
        },
        {
            input: { foo: 'bar' },
            output: false,
        },
    ];

    testCases.forEach(({ input, output }) => {
        it(`isEmptyObject [${JSON.stringify(input)}] -> [${String(output)}]`, () => {
            expect(isEmptyObject(input)).toEqual(output);
        });
    });
});
