export function groupBy<T, R extends string = string>(
    array: readonly T[],
    iteratee: (value: T, index: number, arr: readonly T[]) => R
) {
    const obj: Partial<Record<R, T[]>> = {};

    array.forEach((el, i, arr) => {
        const key = iteratee(el, i, arr);
        const record = obj[key];
        if (record) {
            record.push(el);
        } else {
            obj[key] = [el];
        }
    });

    return obj;
}
