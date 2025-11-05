import { hasOwnProperty } from '../hasOwnProperty';

export function forOwn<Obj extends Record<string, unknown>>(
    obj: Obj,
    fn: (value: Obj[keyof Obj], key: keyof Obj, obj: Obj) => void,
    context?: unknown
): void {
    for (const key in obj) {
        if (hasOwnProperty(obj, key)) {
            fn.call(context, obj[key], key, obj);
        }
    }
}
