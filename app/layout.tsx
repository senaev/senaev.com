import React from 'react';
import './globals.css';
import type { Metadata } from 'next';

import { SENAEV_SITE_METADATA } from 'const/const';

export const metadata: Metadata = SENAEV_SITE_METADATA;

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang={'en'}>
            <body>
                {children}
            </body>
        </html>
    );
}
