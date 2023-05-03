import { isString } from '../isString';

/**
 * Checking that argument is string and can be converted to number
 */
export function isConvertableToInteger(str: unknown): boolean {
    return isString(str) && str === parseInt(str, 10).toString(10);
}
