import { NextResponse } from 'next/server';

import { createCrossOriginHeaders } from 'utils/net/createCrossOriginHeaders';

export function GET(request: Request) {
    return NextResponse.json({
        request,
    }, {
        headers: {
            ...createCrossOriginHeaders(request),
            'Observe-Browsing-Topics': '?1',
        },
    });
}
