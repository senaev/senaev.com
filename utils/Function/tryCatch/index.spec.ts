import { tryCatch } from '.';

describe('tryCatch', () => {
    it('should execute valid function', () => {
        let x = 1;
        tryCatch(() => x++);
        expect(x).toEqual(2);
    });

    it('should execute onError callback', () => {
        let error;
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- for test purposes
        const result = tryCatch(
            (): never => {
                throw new Error('fn throws an error');
            },
            (e): void => {
                error = e;
            },
        );
        expect(result === undefined).toEqual(true);
        expect(error !== undefined).toEqual(true);
    });

    it('should infer valid return type', () => {
        const fn = (): number => 10;
        expect(tryCatch(fn)! > 0).toEqual(true);
    });
});