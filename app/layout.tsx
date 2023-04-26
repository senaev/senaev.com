import React from 'react';
import '../globals/globals.css';
import type { Metadata } from 'next';

import { PageLayoutWrapper } from 'components/PageLayoutWrapper';
import { SENAEV_SITE_METADATA } from 'const/const';

export const metadata: Metadata = SENAEV_SITE_METADATA;

// eslint-disable-next-line no-restricted-exports -- page
export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang={'en'}>
            <body>
                <PageLayoutWrapper>
                    {children}
                </PageLayoutWrapper>
            </body>
        </html>
    );
}
