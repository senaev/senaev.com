import { forOwn } from '../forOwn';
import type { Invert } from './Invert';

/**
 * Changes keys with their corresponding values in the object
 */
export function invertObject<T extends Record<string, string>>(object: T): Invert<T> {
    const result: Record<string, string> = {};

    forOwn(object, (value, key) => {
        result[value] = key.toString();
    });

    return result as Invert<T>;
}
