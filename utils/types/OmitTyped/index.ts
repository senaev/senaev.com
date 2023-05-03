// Safe to use any since it will be used for extends clause only
type UnknownRecord = Record<keyof unknown, unknown>;

/** Provides `Omit` functionality, but with typed keys. */
export type OmitTyped<T extends UnknownRecord, TKeys extends keyof T> = Omit<T, TKeys>;
