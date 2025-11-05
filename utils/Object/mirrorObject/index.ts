import { mapObjectValues } from '../mapObjectValues';

import type { Mirror } from './Mirror';

export function mirrorObject<T extends Record<string, unknown>>(object: T): Mirror<keyof T> {
    return mapObjectValues(object, (_, key) => key) as Mirror<keyof T>;
}
