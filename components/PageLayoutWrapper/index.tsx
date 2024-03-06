import React from 'react'

import { GoogleAdSenseCodeSnippet } from 'components/GoogleAdSenseCodeSnippet'
import { GoogleAnalyticsCodeSnippet } from 'components/GoogleAnalyticsCodeSnippet'
import { GoogleTagManagerBody, GoogleTagManagerHead } from 'components/GoogleTagManager'
import { Navigation } from 'components/Navigation'
import { YandexMetrikaCounter } from 'components/YandexMetrikaCounter'

export function PageLayoutWrapper ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
        <>
            <YandexMetrikaCounter />
            <GoogleAdSenseCodeSnippet />
            <GoogleAnalyticsCodeSnippet />
            <Navigation />
            <GoogleTagManagerHead />
            <GoogleTagManagerBody />
            {children}
        </>
  )
}
