import {
    describe,
    expect,
    it,
} from 'vitest';
import { deleteUndefinedProperties } from './';

describe('deleteUndefinedProperties', () => {
    it('delete properties', () => {
        const object = {
            foo: '',
            bar: null,
            baz: undefined,
        };

        expect(deleteUndefinedProperties(object)).toStrictEqual({
            foo: '',
            bar: null,
        });
    });
});
