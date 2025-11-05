/**
 * differs from Partial<T>
 * Partial doesn't requires keys to be defined in object
 * This one requires keys to be defined
 */
export type ObjectWithUndefinedProperties<T extends Record<string, unknown>> = {
    [key in keyof T]: T[key] | undefined;
};
