import { entriesToObject } from './';

describe('entriesToObject', () => {
    it('normal logic', () => {
        expect(entriesToObject([
            ['prop1', 1],
            ['prop2', 2],
        ])).toEqual({
            prop1: 1,
            prop2: 2,
        });
    });

    it('last value from the same object property names', () => {
        const object = entriesToObject([
            ['prop1', 1],
            ['prop2', 2],
            ['prop2', 22],
            ['prop3', 3],
            ['prop2', 222],
        ]);

        expect(object).toEqual({
            prop1: 1,
            prop2: 222,
            prop3: 3,
        });
    });

    it('reverse logic', () => {
        class TestClass {
            public readonly prop1: unknown;

            public readonly prop2: unknown;

            public constructor(prop1: unknown, prop2: unknown) {
                this.prop1 = prop1;
                this.prop2 = prop2;
            }

            public method() {
                //
            }
        }

        const testInstance = new TestClass(1, 2);

        expect(entriesToObject(Object.entries(testInstance))).toEqual({
            prop1: 1,
            prop2: 2,
        });
    });
});
