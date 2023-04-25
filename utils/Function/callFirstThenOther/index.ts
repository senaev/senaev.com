export function callFirstThenOther<T extends (
    this: unknown, ...args: unknown[]) => unknown>(
    this: unknown,
    first: T,
    other: T,
): T {
    let called = false;
    const wrapper = function (this: unknown) {
        const fn = called ? other : first;
        called = true;

        // eslint-disable-next-line prefer-rest-params -- use arguments as a native way to pass parameters
        return fn.apply(this, arguments as unknown as Parameters<T>);
    } as T;

    return function (this: unknown) {
        // eslint-disable-next-line prefer-rest-params -- use arguments as a native way to pass parameters
        return wrapper.apply(this, arguments as unknown as Parameters<T>);
    } as T;
}
