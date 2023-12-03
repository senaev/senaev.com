import { NextResponse } from 'next/server';

import { createCrossOriginHeaders } from 'utils/net/createCrossOriginHeaders';

export function GET(request: Request) {
    const secBrowsingTopics = request.headers.get('sec-browsing-topics');

    let parsedTopics: number[] | undefined;
    if (secBrowsingTopics) {
        const topicsOnly = secBrowsingTopics.split(';')[0];

        if (topicsOnly?.startsWith('(') && topicsOnly.endsWith(')')) {
            const topics = topicsOnly.slice(1, -1).split(' ')
                .map(Number);

            parsedTopics = topics;
        }
    }

    return NextResponse.json({
        request: {
            url: request.url,
            parsedTopics,
            secBrowsingTopics,
            headers: [...request.headers.entries()],
        },
    }, {
        headers: {
            ...createCrossOriginHeaders(request),
            'Observe-Browsing-Topics': '?1',
        },
    });
}
