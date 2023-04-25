type Fn = (...args: unknown[]) => unknown;
type Cb = (e: unknown) => unknown;

export function tryCatch<T extends Fn, E extends Cb>(
    fn: T,
    onError?: E,
): ReturnType<T> | undefined {
    try {
        return fn() as ReturnType<T>;
    } catch (e) {
        if (typeof onError === 'function') {
            onError(e);
        }
    }

    return undefined;
}
