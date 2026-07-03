import { NOTES_REMOTE_URL } from 'const/NOTES_REMOTE_URL';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { basename } from 'path';

export async function GET(request: Request): Promise<NextResponse> {
    const decodedId = decodeURIComponent(basename(request.url));

    const url = `${NOTES_REMOTE_URL()}/?file=${encodeURIComponent(decodedId)}`;
    const response = await fetch(url);

    if (!response.ok) {
        return notFound();
    }

    const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
        status: 200,
        statusText: 'OK',
        headers: {
            'content-type': contentType,
        },
    });
}
