'use client';

import React from 'react';

export function GoogleAdUnit (): JSX.Element {
    React.useEffect(() => {
        const win: Window & {
      adsbygoogle?: unknown[]
      // eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-explicit-any -- ignore
    } = window as any;

        if (!win.adsbygoogle) {
            win.adsbygoogle = [];
        }

        win.adsbygoogle.push({});
    });

    return (
        <>
            <ins
                className={'adsbygoogle'}
                style={{
                    display: 'inline-block',
                    width: 320,
                    height: 180,
                }}
                data-ad-client={'ca-pub-5756750483186348'}
                data-ad-slot={'3155757085'}
            />
        </>
    );
}
