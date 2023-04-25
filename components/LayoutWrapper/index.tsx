import React from 'react';
import Head from 'next/head';

import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';
import { Navigation } from 'components/Navigation';
import { HtmlHead } from 'components/HtmlHead';

export function LayoutWrapper({ children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <>
            <Head>
                <HtmlHead />
            </Head>
            <YandexMetrikaCounter />
            <GoogleAdSenseCodeSnippet />
            <GoogleAnalyticsCodeSnippet />
            <Navigation />
            {children}
        </>
    );
}
