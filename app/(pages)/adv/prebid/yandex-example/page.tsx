'use client';

import { useEffect } from 'react';

import { loadScript } from 'utils/Script/loadScript';
import type { GlobalScope } from 'utils/types/GlobalScope';

type PrebidWindow = GlobalScope & {
    pbjs?: {
        que: unknown[];
        addAdUnits: (adUnits: unknown) => void;
        requestBids: (params: {
            bidsBackHandler: unknown;
            timeout: unknown;
        }) => void;
        initAdserverSet?: true;
        setTargetingForGPTAsync: VoidFunction;
    };
};

type Bid = unknown;

export default function Page() {
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals -- ignore
        const win: PrebidWindow = window;

        /* eslint-disable no-console -- ignore */
        console.log('start initialization');

        loadScript('/prebid7.47.0.js')
            .then(() => {
                console.log('scripts are loaded');

                const div_1_sizes = [
                    [320, 180],
                    [180, 320],
                ];
                const PREBID_TIMEOUT = 1000;

                const adUnits = [
                    {
                        code: '/19968336/header-bid-tag-0',
                        mediaTypes: {
                            banner: {
                                sizes: div_1_sizes,
                            },
                        },
                        bids: [
                            {
                                bidder: 'yandex',
                                params: {
                                    pageId: 2349763,
                                    impId: 1,
                                },
                            },
                        ],
                    },
                ];

                if (!win.pbjs) {
                    throw new Error('win.pbjs is nod defined');
                }

                const { pbjs } = win;

                pbjs.que.push(() => {
                    pbjs.addAdUnits(adUnits);
                    pbjs.requestBids({
                        bidsBackHandler(bids?: Bid, timedOut?: boolean) {
                            console.log('bidsBackHandler', bids, timedOut);
                        },
                        timeout: PREBID_TIMEOUT,
                    });
                });

                console.log('TODO: start prebid initialization');
            })
            .catch((error: Error) => {
                console.error(error);

                // eslint-disable-next-line no-alert -- ignore
                alert(error.message);
            });
    }, []);

    /* eslint-enable -- ignore */

    return (
        <>
            <h5>{'320x180 || 180x320'}</h5>
            <div id={'div-1'} />
        </>
    );
}
