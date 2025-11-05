// eslint-disable-next-line @typescript-eslint/no-explicit-any -- there is no way do declare it without any
export type Mirror<T extends keyof any> = { [key in T]: key };
