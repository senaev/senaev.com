import Script from 'next/script';

export function GoogleAnalyticsCodeSnippet (): JSX.Element {
    return (
        <>
            <Script
                src={'https://www.googletagmanager.com/gtag/js?id=G-E0N21TH99Y'}
                strategy={'afterInteractive'}
            />
            <Script id={'google-analytics'} strategy={'afterInteractive'}>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-E0N21TH99Y');
                `}
            </Script>
        </>
    );
}
