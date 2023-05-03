import { hasOwnProperty } from './';

describe('hasOwnProperty', () => {
    it('should return true if checks own property', () => {
        expect(hasOwnProperty({ a: 1 }, 'a')).toEqual(true);
    });

    it('should return false if checks proto\'s property', () => {
        expect(hasOwnProperty({ a: 1 }, 'toString')).toEqual(false);
    });

    it('should return true if checks own property in object without proto', () => {
        const obj = Object.create(null) as {
            a?: number;
        };
        obj.a = 1;

        expect(hasOwnProperty(obj, 'a')).toEqual(true);
    });

    it('should return true if checks own property in object with redeclared hasOwnProperty method', () => {
        const obj = {
            a: 1,
            hasOwnProperty() {
                return false;
            },
        };

        expect(hasOwnProperty(obj, 'a')).toEqual(true);
    });
});
