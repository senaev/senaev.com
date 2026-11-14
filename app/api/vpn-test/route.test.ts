import {
    describe, expect, it,
} from 'vitest';
import { GET, HEAD } from './route';

const request = (query = '', headers = {}) => new Request(`https://senaev.com/api/vpn-test${query}`, { headers });

describe('bounded VPN test response', () => {
    it.each([
        1,
        8192,
        16384,
        65536,
        524288,
    ])('returns exactly %i binary bytes', async (bytes) => {
        const response = GET(request(`?bytes=${bytes}`));
        expect(response.status).toBe(200);
        expect(response.headers.get('content-length')).toBe(String(bytes));
        expect(response.headers.get('content-encoding')).toBe('identity');
        expect(response.headers.get('cache-control')).toBe('no-store, no-transform');
        expect((await response.arrayBuffer()).byteLength).toBe(bytes);
    });

    it('uses deterministic prefixes and a 16 KiB default', async () => {
        const short = new Uint8Array(await GET(request('?bytes=8192')).arrayBuffer());
        const normal = new Uint8Array(await GET(request()).arrayBuffer());
        expect(normal.length).toBe(16384);
        expect(short).toEqual(normal.slice(0, short.length));
        expect(new Set(short).size).toBe(256);
    });

    it.each([
        '0',
        '-1',
        '524289',
        '999999999999999999',
        '1.5',
        '1e3',
        'Infinity',
        '',
        '0001',
    ])('rejects bytes=%s', (bytes) => {
        expect(GET(request(`?bytes=${bytes}`)).status).toBe(400);
    });

    it('rejects duplicate/unknown parameters and Range without allocating a payload', () => {
        expect(GET(request('?bytes=1&bytes=2')).status).toBe(400);
        expect(GET(request('?url=https://elsewhere.test')).status).toBe(400);
        expect(GET(request('', { Range: 'bytes=0-8191' })).status).toBe(400);
    });

    it('HEAD preserves metadata and has no body, including errors', async () => {
        const response = HEAD(request('?bytes=524288'));
        expect(response.status).toBe(200);
        expect(response.headers.get('content-length')).toBe('524288');
        expect(await response.text()).toBe('');
        const invalid = HEAD(request('?bytes=0'));
        expect(invalid.status).toBe(400);
        expect(await invalid.text()).toBe('');
    });
});
