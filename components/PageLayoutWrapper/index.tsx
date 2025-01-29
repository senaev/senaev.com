import React from 'react';

import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { GoogleTagManagerBody, GoogleTagManagerHead } from 'components/GoogleTagManager';
import { Navigation } from 'components/Navigation';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';
import { Merriweather } from 'next/font/google';

// Font from vas3k website
const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'], // Add the weights you need
    style: ['normal', 'italic'], // Add styles if needed
    display: 'swap', // Improves loading performance
});

export function PageLayoutWrapper ({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <YandexMetrikaCounter />
            <GoogleAdSenseCodeSnippet />
            <GoogleAnalyticsCodeSnippet />
            <Navigation />
            <GoogleTagManagerHead />
            <GoogleTagManagerBody />
            <main className={merriweather.className}>
                {children}
            </main>
        </>
    );
}
