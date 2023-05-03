import { getObjectKeys } from '../getObjectKeys';

export function filterObject<O extends Record<string, unknown>>(
    object: O,
    filterFunction: (value: O[keyof O], key: keyof O) => boolean,
): O {
    const resultObject = {} as O;

    getObjectKeys(object).forEach((key) => {
        const shouldRemainProperty = filterFunction(object[key], key);

        if (shouldRemainProperty) {
            resultObject[key] = object[key];
        }
    });

    return resultObject;
}
