import { filterObject } from './';

describe('filterObject', () => {
    const object = {
        hello: 'world',
        first: 1,
        second: 2,
        third: 3,
        foo: 'bar',
    };

    const testCases = [
        {
            name: 'should remain numbers',
            filter(value: unknown) {
                return typeof value === 'number';
            },
            result: {
                first: 1,
                second: 2,
                third: 3,
            },
        },
        {
            name: 'should remain first and second',
            filter(_: unknown, key: string) {
                return key === 'first' || key === 'second';
            },
            result: {
                first: 1,
                second: 2,
            },
        },
        {
            name: 'should remove all props',
            filter() {
                return false;
            },
            result: {},
        },
        {
            name: 'should remain all props',
            filter() {
                return true;
            },
            result: object,
        },
    ];

    testCases.forEach(({ name, filter, result }) => {
        it(name, () => {
            expect(filterObject(object, filter)).toEqual(result);
        });
    });
});
