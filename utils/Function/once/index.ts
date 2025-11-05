// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the only way to declare this is using any
export function once<T extends (this: unknown, ...args: any[]) => unknown>(this: unknown, fn: T): T {
    let onceFn: T = function (this: unknown) {
        // eslint-disable-next-line prefer-const -- create variable before assign, to avoid using nonexistent var
        let result: unknown;

        // Assign function before to avoid loop call
        onceFn = (() => result) as T;

        // eslint-disable-next-line prefer-rest-params -- use arguments as a native way to pass arguments
        result = fn.apply(this, arguments as unknown as Parameters<T>);

        return result;
    } as T;

    return function (this: unknown) {
        // eslint-disable-next-line prefer-rest-params -- use arguments as a native way to pass arguments
        return onceFn.apply(this, arguments as unknown as Parameters<T>);
    } as T;
}
