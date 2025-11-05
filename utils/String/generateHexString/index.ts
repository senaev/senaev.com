export function generateHexString(length: number): string {
    let x = '';
    for (let key = 0; key < length; key++) {
        // eslint-disable-next-line no-bitwise -- for speed optimizations
        x += ((Math.random() * 16) | 0).toString(16);
    }
    return x;
}
