import { NextResponse } from 'next/server';

import { createCrossOriginHeaders } from 'utils/net/createCrossOriginHeaders';

export function GET(request: Request) {
    const secBrowsingTopics = request.headers.get('sec-browsing-topics');

    const { searchParams, hostname } = new URL(request.url);

    let parsedTopics: number[] | undefined;
    let version: string | undefined;
    if (secBrowsingTopics) {
        const split = secBrowsingTopics.split(';');
        const topicsPart = split[0];

        // default is '();p=P0000000000000000000000000000000'
        // when topic exists '(299 328);v=chrome.1:1:1, ();p=P00000'
        if (topicsPart && topicsPart.length > 2) {
            if (topicsPart.startsWith('(') && topicsPart.endsWith(')')) {
                const topics = topicsPart.slice(1, -1).split(' ')
                    .map(Number);

                parsedTopics = topics;

                version = split[1]?.split('=')[1];
            }
        }
    }

    const bidder = searchParams.get('bidder');

    return NextResponse.json({
        segment: {
            domain: hostname,
            topics: parsedTopics?.map((topic) => {
                const versionSplit = version?.split(':');

                return {
                    configVersion: versionSplit?.[0],
                    // TODO: modelVersion и taxonomyVersion могут быть перепутаны
                    modelVersion: versionSplit?.[1],
                    taxonomyVersion: versionSplit?.[2],
                    topic,
                    version,
                };
            }),
            bidder,
        },
        ext: {
            bidder,
            parsedTopics,
            secBrowsingTopics,
            url: request.url,
            headers: [...request.headers.entries()],
        },
    }, {
        headers: {
            ...createCrossOriginHeaders(request),
            'Observe-Browsing-Topics': '?1',
        },
    });
}
