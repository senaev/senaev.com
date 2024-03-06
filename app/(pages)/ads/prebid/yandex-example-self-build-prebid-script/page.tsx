'use client'

import { useEffect } from 'react'

import { loadScript } from 'utils/Script/loadScript'
import type { Bid, PrebidWindow } from 'utils/types/Prebid'

const BLOCK_ID = 'test-block' as const
// https://paste.yandex-team.ru/a40c871e-e5a1-47c7-8903-71dd484777ad

export default function Page (): JSX.Element {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals -- ignore
    const win: PrebidWindow = window
    const doc = win.document
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
    const div = doc.getElementById(BLOCK_ID)!

    /* eslint-disable no-console -- ignore */
    console.log('start initialization')

    loadScript('/prebid/v1/github.com/senaev/prebid.js/build/dist/prebid.js')
      .then(() => {
        console.log('scripts are loaded')

        const div1Sizes = [
          [320, 180],
          [180, 320]
        ]
        const PREBID_TIMEOUT = 1000

        const adUnits = [
          {
            code: BLOCK_ID,
            mediaTypes: {
              banner: {
                sizes: div1Sizes
              }
            },
            bids: [
              {
                bidder: 'yandex',
                params: {
                  pageId: 2349763,
                  impId: 1
                }
              },
              {
                bidder: 'air',
                params: {
                  pageId: 2349763,
                  impId: 1
                }
              }
            ]
          }
        ]

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!win.pbjs) {
          throw new Error('win.pbjs is nod defined')
        }

        const { pbjs } = win

        function renderOne (winningBid?: Bid): void {
          console.log('renderOne', winningBid)

          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (winningBid?.adId) {
            const renderToElement = doc.getElementById(winningBid.adUnitCode)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (renderToElement) {
              const iframe = doc.createElement('iframe')
              console.log('iframe', iframe)
              iframe.frameBorder = '0'
              renderToElement.appendChild(iframe)
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
              const iframeDoc = iframe.contentWindow!.document
              pbjs.renderAd(iframeDoc, winningBid.adId)
            }
          }
        }

        pbjs.que.push(() => {
          pbjs.addAdUnits(adUnits)
          pbjs.requestBids({
            bidsBackHandler (bids?: unknown, timedOut?: boolean) {
              const winners = pbjs.getHighestCpmBids()

              console.log('bidsBackHandler', {
                bids,
                timedOut,
                winners
              })

              if (winners.length === 0) {
                const message = 'No winners in this auction'
                div.innerText = message
                console.log(message)
                return
              }

              for (const winner of winners) {
                renderOne(winner)
              }
            },
            timeout: PREBID_TIMEOUT
          })
        })

        console.log('start prebid initialization')
      })
      .catch((error: Error) => {
        console.error(error)

        // eslint-disable-next-line no-alert -- ignore
        alert(`Error=[${String(error)}] message=[${error.message}]`)
      })
  }, [])

  /* eslint-enable -- ignore */

  return (
        <>
            <h5>{'320x180 || 180x320'}</h5>
            <div id={BLOCK_ID} />
        </>
  )
}
