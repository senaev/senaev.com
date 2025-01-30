import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { GoogleTagManagerBody, GoogleTagManagerHead } from 'components/GoogleTagManager';
import { Navigation } from 'components/Navigation';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';
import { fontMerriweatherClassname } from 'const/fontMerriweatherClassname';
import React from 'react';

export function PageLayoutWrapper ({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <YandexMetrikaCounter />
            <GoogleAdSenseCodeSnippet />
            <GoogleAnalyticsCodeSnippet />
            <Navigation />
            <GoogleTagManagerHead />
            <GoogleTagManagerBody />
            <main className={fontMerriweatherClassname}>
                {children}
            </main>
        </>
    );
}
