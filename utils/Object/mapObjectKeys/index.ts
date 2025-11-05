import { getObjectKeys } from '../getObjectKeys';

export function mapObjectKeys<T extends Record<string, unknown>, S extends string>(
    object: T,
    mapFunction: (key: keyof T, value: T[keyof T]) => S
): Record<S, T[keyof T]> {
    const resultObject = {} as Record<S, T[keyof T]>;

    getObjectKeys(object).forEach((key) => {
        const newKey = mapFunction(key, object[key]);
        resultObject[newKey] = object[key];
    });

    return resultObject;
}
