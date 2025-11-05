import type { AssertTypesCompatible } from '../../../types/AssertTypesCompatible';

import type { Invert } from '.';

type Foo = {
    '1': 'first';
    '2': 'second';
    '3': 'third';
};

// { first: "1"; second: "2"; third: "3"; }
type InvertedFoo = Invert<Foo>;

type a = AssertTypesCompatible<Foo, {
    '1': 'first';
    '2': 'second';
    '3': 'third';
}>;

// @ts-expect-error incompatible
type b = AssertTypesCompatible<Foo, {
    '1': 'first';
    '2': 'second!!!';
    '3': 'third';
}>;

// @ts-expect-error not enough properties ("2")
type c = AssertTypesCompatible<Foo, {
    '1': 'first';
    '3': 'third';
}>;

// the same as Foo
type DoubleInvertedFoo = Invert<InvertedFoo>;
type d = AssertTypesCompatible<Foo, DoubleInvertedFoo>;

// @ts-expect-error ignore unused type
type unused = AssertTypesCompatible<unknown[], [a, b, c, d, e, f, g]>;
