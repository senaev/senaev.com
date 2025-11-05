// eslint-disable-next-line @typescript-eslint/no-explicit-any -- using any to declare any type of key
export function hasOwnProperty<O>(obj: O, key: keyof any): key is keyof O {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
