import { isObject } from '../../Object';

import { callFunctions } from '.';

describe('callFunctions', () => {
    it('simple case', () => {
        const functions = [jest.fn(), jest.fn(), jest.fn()];

        callFunctions(functions);

        functions.forEach((func) => {
            expect(func.mock.calls.length).toEqual(1);
        });

        callFunctions(functions);

        functions.forEach((func) => {
            expect(func.mock.calls.length).toEqual(2);
        });
    });

    it('do not throw error if some array elements are not functions', () => {
        const functions = [
            undefined,
            jest.fn(),
            213,
            jest.fn(),
            'hello',
            jest.fn(),
            null,
        ] as unknown[] as jest.Mock[];

        callFunctions(functions);

        functions.forEach((func) => {
            if (Boolean(func) && isObject(func.mock)) {
                expect(func.mock.calls.length).toEqual(1);
            }
        });

        callFunctions(functions);

        functions.forEach((func) => {
            if (Boolean(func) && isObject(func.mock)) {
                expect(func.mock.calls.length).toEqual(2);
            }
        });
    });

    it('do not throw error if array is not array', () => {
        // @ts-expect-error should NOT consider undefined as a functions array
        callFunctions(undefined);
        // @ts-expect-error should NOT consider null as a functions array
        callFunctions(null);
        // @ts-expect-error should NOT consider string as a functions array
        callFunctions('hello');
        // @ts-expect-error should NOT consider number as a functions array
        callFunctions(123);
        // @ts-expect-error should NOT consider object as a functions array
        callFunctions({});
    });

    it('call with arguments', () => {
        const functions = [jest.fn(), jest.fn(), jest.fn()] as jest.Mock<unknown, [number, string]>[];

        callFunctions(functions, 1, '2');

        functions.forEach((func) => {
            expect(func.mock.calls.length).toEqual(1);

            const [
                a,
                b,
                // @ts-expect-error there are NO third parameter
                c,
            ] = func.mock.calls[0]!;

            expect(a).toEqual(1);
            expect(b).toEqual('2');
            expect(c).toEqual(undefined);
        });
    });
});
