import { generateHexString } from './';

const RANDOM_INT = Math.floor(Math.random() * (2 ** 10));
const ALLOWED_SYMBOLS = '0123456789abcdef';

describe('generateHexString', () => {
    it('length', () => {
        expect(generateHexString(0).length).toEqual(0);
        expect(generateHexString(16).length).toEqual(16);
        expect(generateHexString(RANDOM_INT).length).toEqual(RANDOM_INT);

        expect(generateHexString(NaN).length).toEqual(0);
    });

    it('symbols', () => {
        const generatedString = generateHexString(1024);

        for (const symbol of generatedString) {
            if (!ALLOWED_SYMBOLS.includes(symbol)) {
                throw new Error(`Disallowed symbol: [${symbol}]`);
            }
        }
    });
});
