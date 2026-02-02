import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set('x-pathname', request.nextUrl.pathname);
    response.headers.set('x-method', request.method);

    return response;
}
