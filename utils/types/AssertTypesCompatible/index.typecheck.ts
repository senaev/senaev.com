import type { AssertTypesCompatible } from '.';

type a = AssertTypesCompatible<'a', 'a'>;
type b = AssertTypesCompatible<'a' | 'b', 'a'>;
// @ts-expect-error incompatible
type c = AssertTypesCompatible<'a', 'a' | 'b'>;
type d = AssertTypesCompatible<
{
    a: 1;
},
{
    a: 1;
}
>;
type e = AssertTypesCompatible<
{
    a: 1;
},
// @ts-expect-error incompatible
{
    a: 2;
}
>;
type f = AssertTypesCompatible<
{
    a: 1;
},
    // @ts-expect-error incompatible
    object
>;
type g = AssertTypesCompatible<
{
    a: 1;
},
{
    a: 1;
    b: 2;
}
>;

// @ts-expect-error ignore unused type
type unused = AssertTypesCompatible<unknown[], [a, b, c, d, e, f, g]>;
