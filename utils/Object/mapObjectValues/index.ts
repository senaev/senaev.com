import { getObjectKeys } from '../getObjectKeys';

export function mapObjectValues<O extends Record<string, unknown>, F extends (
    value: O[keyof O], key: keyof O) => unknown>(
    object: O,
    mapFunction: F
): Record<keyof O, ReturnType<F>> {
    const resultObject = {} as Record<keyof O, ReturnType<F>>;

    getObjectKeys(object).forEach((key) => {
        resultObject[key] = mapFunction(object[key], key) as ReturnType<F>;
    });

    return resultObject;
}
