import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';
import { once } from '.';

describe('function', () => {
    describe('once', () => {
        let fn: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            fn = vi.fn((x: number, y: number) => x + y);
        });

        it('should be called once', () => {
            const onceFn = once(fn as (x?: number, y?: number) => number);

            expect(fn.mock.calls.length).toEqual(0);

            onceFn();
            expect(fn.mock.calls.length).toEqual(1);

            onceFn();
            expect(fn.mock.calls.length).toEqual(1);

            onceFn();
            expect(fn.mock.calls.length).toEqual(1);
        });

        it('should return the same result on the rest calls', () => {
            const onceFn = once(fn as (x: number, y: number) => number);

            expect(fn.mock.calls.length).toEqual(0);

            const result: number = onceFn(1, 2);
            expect(result).toEqual(3);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
            const nextResult: number = onceFn(4, 5);
            expect(nextResult).toEqual(3);

            expect(fn.mock.calls.length).toEqual(1);
        });

        it('save context', () => {
            const randomNumber = Math.random();

            const randomNumberFromContext: number = once(function (this: unknown) {
                return this as number;
            }).apply(randomNumber);

            expect(randomNumberFromContext).toEqual(randomNumber);
        });

        it('generic should work', () => {
            type Func<T> = (variable: T) => T;
            const func: Func<{
                x: number;
                y: string;
                z: {
                    a: boolean;
                    b: null;
                };
            }> = (obj) => obj;

            const result = once(func)({
                x: 1,
                y: '2',
                z: {
                    a: true,
                    b: null,
                },
            });

            // typescript passes type through generic
            expect(result.z.a).toEqual(true);
        });

        it('should correctly handle recursion', () => {
            let callsCount = 0;
            const func = once(() => {
                func();

                callsCount++;
                return 123;
            });

            const result = func();

            expect(callsCount).toEqual(1);
            expect(result).toEqual(123);
        });
    });
});
