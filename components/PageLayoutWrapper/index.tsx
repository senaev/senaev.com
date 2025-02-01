import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { GoogleTagManagerBody, GoogleTagManagerHead } from 'components/GoogleTagManager';
import { Navigation } from 'components/Navigation';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';
import { FONT_MERRIWEATHER_CLASSNAMES } from 'const/FONT_MERRIWEATHER_CLASSNAMES/FONT_MERRIWEATHER_CLASSNAMES';
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
            <div className={FONT_MERRIWEATHER_CLASSNAMES}>
                {children}
            </div>
        </>
    );
}
