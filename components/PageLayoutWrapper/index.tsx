import React from 'react';

import { Navigation } from 'components/Navigation';
import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';

export function PageLayoutWrapper({ children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <>
            <YandexMetrikaCounter />
            <GoogleAdSenseCodeSnippet />
            <GoogleAnalyticsCodeSnippet />
            <Navigation />
            {children}
        </>
    );
}
