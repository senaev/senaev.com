import type { Metadata } from 'next';
import { headers } from 'next/headers';
import React, { type JSX } from 'react';
import './globals.css';

import { SENAEV_SITE_METADATA } from 'const/const';
import { nextjsHttpRequestsTotal } from 'utils/prometheus/nextjs-metrics';

export const metadata: Metadata = SENAEV_SITE_METADATA;

export default async function Layout ({
    children,
}: {
    children: React.ReactNode;
}): Promise<JSX.Element> {
    const headersList = await headers();
    const path = headersList.get('x-pathname') ?? 'unknown';
    const method = headersList.get('x-method') ?? 'unknown';
    nextjsHttpRequestsTotal.inc({
        path,
        method,
    });

    console.log('nextjsHttpRequestsTotal', path, method);

    return (
        <html lang={'en'}>
            <body>
                {children}
            </body>
        </html>
    );
}
