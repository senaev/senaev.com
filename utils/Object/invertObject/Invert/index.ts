type KeyFromValue<V, T extends Record<string, string>> = {
    [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

/**
 * Разворот ключей и значений в объекте
 *
 * NB: пока есть технические ограничения:
 * 1. Нельзя использовать `number` и `symbol` в качестве ключей или значений,
 * т.к. ругается на `Record<PropertyKey, PropertyKey>`
 */
export type Invert<T extends { [key in string]: string }> = { [V in T[keyof T]]: KeyFromValue<V, T> };
