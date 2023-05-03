import { isString } from '../isString';

/**
 * Проверяет, что аргумент - строка, причем непустая
 */
export function isNonEmptyString(str: unknown): str is string {
    return isString(str) && str.length > 0;
}
