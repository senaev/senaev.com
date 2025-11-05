import { getObjectKeys } from '../getObjectKeys';

export function isEmptyObject<T extends Record<string, unknown>>(object: T): boolean {
    return !getObjectKeys(object).length;
}
