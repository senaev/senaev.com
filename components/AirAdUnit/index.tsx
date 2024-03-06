'use client'

import React from 'react'
import { once } from 'utils/Function/once'
import { loadScript } from 'utils/Script/loadScript'

declare const Ya: {
  Context: {
    AdvManager: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
      render: (arg: any) => void
    }
  }
}

const loadContextScript = once(async (): Promise<void> => {
  await loadScript('https://air.tech/ads/scripts/loader.js')
})

export function AirAdUnit ({
  size,
  blockId
}: {
  size: {
    width: number
    height: number
  }
  blockId: string
}): JSX.Element {
  const { width, height } = size

  const elementId = `${blockId}-element`

  React.useEffect(() => {
    loadContextScript()
      .then(() => {
        Ya.Context.AdvManager.render({
          blockId,
          renderTo: elementId
        })
      })
      .catch((error) => {
        throw error
      })
  }, [blockId, elementId])

  return (
        <div style={{
          width, height: height + 45
        }}>
            <h3>{`${width}x${height}`}</h3>
            <div
                style={{
                  width, height
                }}
                id={elementId}
            />
        </div>
  )
}
