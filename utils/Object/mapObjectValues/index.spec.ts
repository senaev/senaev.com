import {
    describe,
    expect,
    it,
} from 'vitest';
import { noop } from '../../Function';

import { mapObjectValues } from '.';

describe('mapObjectValues', () => {
    const testCases: [Record<string, unknown>, Record<string, unknown>][] = [
        [
            {},
            {},
        ],
        [
            { foo: 1 },
            { foo: 'foo-1' },
        ],
        [
            {
                foo: 1,
                bar: 2,
            },
            {
                foo: 'foo-1',
                bar: 'bar-2',
            },
        ],
    ];
    testCases.forEach(([
        obj,
        expectedResult,
    ]) => {
        it(`${JSON.stringify(obj)} -> ${String(expectedResult)}`, () => {
            expect(mapObjectValues(obj, (value, key) => `${key}-${String(value)}`)).toEqual(expectedResult);
        });
    });

    it('should map A to B', () => {
        type A = {
            foo: string;
        };
        type B = {
            foo: 'baz' | undefined;
        };
        const expectB = (_b: B) => {
            noop(_b);
        };

        const a: A = { foo: 'bar' };
        const maybeB = mapObjectValues(a, (): 'baz' | undefined => {
            // Should always be true
            if (Math.random() >= 0) {
                return 'baz' as const;
            }

            return undefined;
        });

        expectB(maybeB);

        const b: B = {
            foo: 'baz',
        };

        expect(maybeB).toEqual(b);
    });
});
