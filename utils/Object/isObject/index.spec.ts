import {
    describe,
    expect,
    it,
} from 'vitest';
import { isObject } from './';

describe('isObject', () => {
    const testCases = [
        {
            input: {},
            output: true,
        },
        {
            input: { foo: 'bar' },
            output: true,
        },
        {
            input() {
                /**/
            },
            output: true,
        },
        {
            input: undefined,
            output: false,
        },
        {
            input: null,
            output: false,
        },
        {
            input: 1234,
            output: false,
        },
        {
            input: 'foobar',
            output: false,
        },
    ];
    testCases.forEach(({ input, output }) => {
        it(`isObject(${JSON.stringify(input)}) -> ${String(output)}`, () => {
            expect(isObject(input)).toEqual(output);
        });
    });
});
