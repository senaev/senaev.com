
import { hasOwnProperty } from '../hasOwnProperty';

export function deleteUndefinedProperties<T extends Record<string, unknown>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
        if (hasOwnProperty(obj, key) && obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }
    return result;
}
