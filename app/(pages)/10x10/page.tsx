'use client';

import { useEffect, type JSX } from 'react';

import { loadScript } from 'utils/Script/loadScript';

interface WindowWithRequire {
  require?: (scripts: string[]) => void
}

export default function Page (): JSX.Element {
    useEffect(() => {
    // eslint-disable-next-line no-restricted-globals -- ignore
        const win: WindowWithRequire = window as unknown as WindowWithRequire;

        // eslint-disable-next-line no-console -- ignore
        console.log('start loading script');
        loadScript('/10x10/js/require.js')
            .then(() => {
                win.require?.(['/10x10/js/main.js']);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console -- ignore
                console.error(error);
            });
    }, []);

    return (
        <div className={'app-container'}>
            <link
                href={'/10x10/css/main.css'}
                rel={'stylesheet'}
            />
            <div id={'app'} />
        </div>
    );
}
