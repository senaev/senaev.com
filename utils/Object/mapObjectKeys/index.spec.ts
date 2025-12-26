import {
    describe,
    expect,
    it,
} from 'vitest';
import { generateHexString } from '../../String';

import { mapObjectKeys } from './';

describe('mapObjectKeys', () => {
    it('empty object', () => {
        expect(mapObjectKeys({}, () => generateHexString(64))).toEqual({});
    });
    it('passing key and value params', () => {
        const initialObject = {
            1: 4,
            2: 5,
            3: 6,
        };

        expect(mapObjectKeys(initialObject, (key, value) => `propertyName_${key}_${value}`)).toEqual({
            propertyName_1_4: 4,
            propertyName_2_5: 5,
            propertyName_3_6: 6,
        });
    });

    it('use last iterable value when keys are the same', () => {
        const initialObject = {
            1: 4,
            2: 5,
            3: 6,
        };

        const entries = Object.entries(initialObject);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
        const lastIterableValue = entries[entries.length - 1]![1];

        expect(mapObjectKeys(initialObject, () => 'propertyName')).toEqual({
            propertyName: lastIterableValue,
        });
    });
});
