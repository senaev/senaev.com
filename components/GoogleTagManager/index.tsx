import Script from 'next/script';

export function GoogleTagManagerHead (): JSX.Element {
    return (
        <Script
            id={'google-hag-manager-head-script'}
            strategy={'beforeInteractive'}
        >
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PHN8D54');
            `}
        </Script>
    );
}

export function GoogleTagManagerBody (): JSX.Element {
    return (
        <noscript>
            <iframe
                title={'google-tag-manager-iframe'}
                src={'https://www.googletagmanager.com/ns.html?id=GTM-PHN8D54'}
                height={'0'}
                width={'0'}
                style={{
                    display: 'none',
                    visibility: 'hidden',
                }}
            >
            </iframe>
        </noscript>
    );
}
