import {
    describe,
    expect,
    it,
} from 'vitest';
import { isNonEmptyString } from '.';

const TEST_CASES: {
    arg: unknown;
    result: boolean;
}[] = [
    {
        arg: {},
        result: false,
    },
    {
        arg: undefined,
        result: false,
    },
    {
        arg: null,
        result: false,
    },
    {
        arg: [],
        result: false,
    },
    {
        arg: 123,
        result: false,
    },
    {
        arg: '',
        result: false,
    },
    {
        arg: ' ',
        result: true,
    },
    {
        arg: '🍷',
        result: true,
    },
];

describe('isNonEmptyString', () => {
    TEST_CASES.forEach(({ arg, result }, i) => {
        it(`[${i}]`, () => {
            expect(isNonEmptyString(arg)).toEqual(result);
        });
    });
});
