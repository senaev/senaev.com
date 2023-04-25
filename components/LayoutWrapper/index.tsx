import React from 'react';

import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet';
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet';
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter';
import { Navigation } from 'components/Navigation';

export function LayoutWrapper({ children }: { children: React.ReactNode; }) {
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
