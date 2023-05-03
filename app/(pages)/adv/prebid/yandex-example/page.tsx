'use client';

import { useEffect } from 'react';

import { loadScript } from 'utils/Script/loadScript';
import type { GlobalScope } from 'utils/types/GlobalScope';

type Bid = {
    adId: string;
    adUnitCode: string;
};

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
        getHighestCpmBids: () => Bid[];
        renderAd: (iframeDoc: Document, adId: string) => void;
    };
};

const BLOCK_ID = 'test-block' as const;
// https://paste.yandex-team.ru/a40c871e-e5a1-47c7-8903-71dd484777ad

export default function Page() {
    useEffect(() => {

        // eslint-disable-next-line no-restricted-globals -- ignore
        const win: PrebidWindow = window;
        const doc = win.document;

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
                        code: BLOCK_ID,
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

                function renderOne(winningBid?: Bid) {
                    console.log('renderOne', winningBid);

                    if (winningBid?.adId) {
                        const div = doc.getElementById(winningBid.adUnitCode);
                        if (div) {
                            const iframe = doc.createElement('iframe');
                            console.log('iframe', iframe);
                            iframe.frameBorder = '0';
                            div.appendChild(iframe);
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
                            const iframeDoc = iframe.contentWindow!.document;
                            pbjs.renderAd(iframeDoc, winningBid.adId);
                        }
                    }
                }

                pbjs.que.push(() => {
                    pbjs.addAdUnits(adUnits);
                    pbjs.requestBids({
                        bidsBackHandler(bids?: unknown, timedOut?: boolean) {

                            const winners = pbjs.getHighestCpmBids();
                            for (const winner of winners) {
                                renderOne(winner);
                            }

                            console.log('bidsBackHandler', {
                                bids,
                                timedOut,
                                winners,
                            });
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
            <div id={BLOCK_ID} />
        </>
    );
}
