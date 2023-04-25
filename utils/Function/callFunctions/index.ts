export function callFunctions<T extends unknown[]>(
    functions: ((this: unknown, ...args: T) => unknown)[],
    ...args: T
): void {
    if (!Array.isArray(functions)) {
        return;
    }

    functions.forEach((func) => {
        if (typeof func === 'function') {
            func(...args);
        }
    });
}
