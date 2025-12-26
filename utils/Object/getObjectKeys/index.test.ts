import {
    describe,
    expect,
    it,
} from 'vitest';
import { getObjectKeys } from './';

describe('getObjectKeys', () => {
    class TestClass {
        public constructor(public readonly prop1: unknown, public readonly prop2: unknown) {}

        public method() {
            //
        }
    }

    const testInstance = new TestClass(1, 2);

    it('native (just own properties)', () => {
        expect(getObjectKeys(testInstance)).toEqual([
            'prop1',
            'prop2',
        ]);
    });

    it('string enum', () => {
        enum StringEnum {
            prop1 = 'value1',
            prop2 = 'value2',
            prop3 = 'value3',
        }

        const keys = getObjectKeys(StringEnum);

        expect(keys).toEqual([
            'prop1',
            'prop2',
            'prop3',
        ]);

        // typescript passes through property name types
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
        if (StringEnum[keys[0]!] === StringEnum.prop1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            expect(StringEnum[keys[1]!]).toEqual(StringEnum.prop2);
        }
    });
});
