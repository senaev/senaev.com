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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
        const div = doc.getElementById(BLOCK_ID)!;

        /* eslint-disable no-console -- ignore */
        console.log('start initialization');

        loadScript('/prebid/v2/prebid.js')
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
                            {
                                bidder: 'senaev',
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
                        const renderToElement = doc.getElementById(winningBid.adUnitCode);
                        if (renderToElement) {
                            const iframe = doc.createElement('iframe');
                            console.log('iframe', iframe);
                            iframe.frameBorder = '0';
                            renderToElement.appendChild(iframe);
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

                            console.log('bidsBackHandler', {
                                bids,
                                timedOut,
                                winners,
                            });

                            if (winners.length === 0) {
                                const message = 'No winners in this auction';
                                div.innerText = message;
                                console.log(message);
                                return;
                            }

                            for (const winner of winners) {
                                renderOne(winner);
                            }

                        },
                        timeout: PREBID_TIMEOUT,
                    });
                });

                console.log('start prebid initialization');
            })
            .catch((error: Error) => {
                console.error(error);

                // eslint-disable-next-line no-alert -- ignore
                alert(`Error=[${String(error)}] message=[${error.message}]`);
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
