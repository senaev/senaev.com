export type FormValuesOf<T> = { -readonly [P in keyof T]: string };
