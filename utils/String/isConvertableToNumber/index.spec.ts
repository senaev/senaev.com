import { isConvertableToInteger } from './';

describe('isConvertableToNumber', () => {
    it('should works', () => {
        expect(isConvertableToInteger('0')).toBeTruthy();
        expect(isConvertableToInteger('1234567890')).toBeTruthy();
    });

    it('should be falsy on out of precision', () => {
        expect(isConvertableToInteger('12345678901234567')).toBeFalsy();
    });

    it('should be falsy on several 0 on start', () => {
        expect(isConvertableToInteger('000')).toBeFalsy();
        expect(isConvertableToInteger('000123')).toBeFalsy();
    });

    it('should be falsy when letter in string', () => {
        expect(isConvertableToInteger('abc')).toBeFalsy();
        expect(isConvertableToInteger('1abc')).toBeFalsy();
        expect(isConvertableToInteger('abc1')).toBeFalsy();
    });

    it('should be falsy on non decimal form', () => {
        expect(isConvertableToInteger('0x01')).toBeFalsy();
        expect(isConvertableToInteger('0o563')).toBeFalsy();
    });

    it('should be falsy on exponential form', () => {
        expect(isConvertableToInteger('1e+32')).toBeFalsy();
    });
});
