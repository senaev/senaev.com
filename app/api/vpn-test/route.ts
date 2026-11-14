export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BYTES = 512 * 1024;
// Fixed pseudorandom binary data avoids a compressible repeated-character payload.
const payload = new Uint8Array(MAX_BYTES);
let state = 0x12345678;
for (let index = 0; index < payload.length; index++) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    payload[index] = state & 255;
}

function respond(request: Request, head: boolean) {
    const params = new URL(request.url).searchParams;
    const value = params.get('bytes') ?? '16384';
    const bytes = Number(value);
    if ([...params.keys()].some((key) => key !== 'bytes') ||
        params.getAll('bytes').length > 1 || !/^[1-9]\d{0,5}$/.test(value) ||
        bytes > MAX_BYTES || request.headers.has('range')) {
        return new Response(head ? null : 'Use bytes=1..524288; Range is unsupported.\n', {
            status: 400,
            headers: { 'Cache-Control': 'no-store' },
        });
    }
    return new Response(head ? null : payload.slice(0, bytes), {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': String(bytes),
            'Content-Encoding': 'identity',
            'Cache-Control': 'no-store, no-transform',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}

export function GET(request: Request) {
    return respond(request, false);
}

export function HEAD(request: Request) {
    return respond(request, true);
}
