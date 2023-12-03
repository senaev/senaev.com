import { NextResponse } from 'next/server';

import { createCrossOriginHeaders } from 'utils/net/createCrossOriginHeaders/indes';

export function POST(request: Request) {
    return NextResponse.json({
        request,
    }, {
        headers: createCrossOriginHeaders(request),
    });
}
