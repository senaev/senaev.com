'use client';

import { useEffect } from 'react';

import { loadScript } from 'utils/Script/loadScript';
import type { PrebidWindow } from 'utils/types/Prebid';

export default function Page() {
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals -- ignore
        const win: PrebidWindow = window;

        /* eslint-disable no-console -- ignore */
        console.log('start initialization');

        loadScript('//www.googletagservices.com/tag/js/gpt.js')
            .then(() => {
                return loadScript('//cdn.jsdelivr.net/npm/prebid.js@latest/dist/not-for-prod/prebid.js');
            })
            .then(() => {
                console.log('scripts are loaded');
                const div_1_sizes = [
                    [300, 250],
                    [300, 600],
                ];
                const div_2_sizes = [
                    [728, 90],
                    [970, 250],
                ];
                const PREBID_TIMEOUT = 1000;
                const FAILSAFE_TIMEOUT = 3000;

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
                                bidder: 'appnexus',
                                params: {
                                    placementId: 13144370,
                                },
                            },
                        ],
                    },
                    {
                        code: '/19968336/header-bid-tag-1',
                        mediaTypes: {
                            banner: {
                                sizes: div_2_sizes,
                            },
                        },
                        bids: [
                            {
                                bidder: 'appnexus',
                                params: {
                                    placementId: 13144370,
                                },
                            },
                        ],
                    },
                ];

                // ======== DO NOT EDIT BELOW THIS LINE =========== //

                if (!win.googletag) {
                    throw new Error('win.googletag is nod defined');
                }

                if (!win.pbjs) {
                    throw new Error('win.pbjs is nod defined');
                }

                const { googletag } = win;
                googletag.cmd ||= [];
                googletag.cmd.push(() => {
                    googletag.pubads().disableInitialLoad();
                });

                const { pbjs } = win;
                pbjs.que ||= [];

                pbjs.que.push(() => {
                    pbjs.addAdUnits(adUnits);
                    pbjs.requestBids({
                        bidsBackHandler: initAdserver,
                        timeout: PREBID_TIMEOUT,
                    });
                });

                function initAdserver() {
                    if (pbjs.initAdserverSet) {
                        return;
                    }
                    pbjs.initAdserverSet = true;
                    googletag.cmd.push(() => {
                        pbjs.que.push(() => {
                            pbjs.setTargetingForGPTAsync();
                            googletag.pubads().refresh();
                        });
                    });
                }
                // in case PBJS doesn't load
                setTimeout(() => {
                    initAdserver();
                }, FAILSAFE_TIMEOUT);

                googletag.cmd.push(() => {
                    googletag.defineSlot('/19968336/header-bid-tag-0', div_1_sizes, 'div-1')
                        .addService(googletag.pubads());

                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });

                googletag.cmd.push(() => {
                    googletag.defineSlot('/19968336/header-bid-tag-1', div_2_sizes, 'div-2')
                        .addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });

                console.log('googletag inited', googletag);

                googletag.cmd.push(() => {
                    console.log('googletag starts displaying div-1');
                    googletag.display('div-1');
                });

                googletag.cmd.push(() => {
                    console.log('googletag starts displaying div-2');
                    googletag.display('div-2');
                });
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
            <h2>{'Basic Prebid.js Example'}</h2>
            <a href={'https://docs.prebid.org/dev-docs/examples/basic-example.html'}>{'Source of example'}</a>

            <h5>{'Div-1'}</h5>
            <div id={'div-1'} />

            <h5>{'Div-2'}</h5>
            <div id={'div-2'} />
        </>
    );
}
