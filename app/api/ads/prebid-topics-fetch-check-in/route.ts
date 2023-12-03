import { NextResponse } from 'next/server';

import { createCrossOriginHeaders } from 'utils/net/createCrossOriginHeaders';

export async function GET(request: Request) {
    return NextResponse.json({
        request: {
            headers: [...request.headers.entries()],
            body: await request.text(),
        },
    }, {
        headers: {
            ...createCrossOriginHeaders(request),
            'Observe-Browsing-Topics': '?1',
        },
    });
}
