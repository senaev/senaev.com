'use client';

import { useEffect } from 'react';

import styles from './index.module.css';

import { once } from 'utils/Function/once';
import { loadScript } from 'utils/Script/loadScript';

declare const Ya: {
  Context: {
    AdvManager: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
      render: (arg: any) => void
    }
  }
};

const loadContextScript = once(async (): Promise<void> => {
    await loadScript('https://yandex.ru/ads/system/context.js');
});

export function YandexAdUnit ({
    blockId,
}: {
  blockId: string
}): JSX.Element {
    const elementId = `${blockId}-element`;

    useEffect(() => {
        loadContextScript()
            .then(() => {
                Ya.Context.AdvManager.render({
                    blockId,
                    renderTo: elementId,
                });
            })
            .catch((error) => {
                throw error;
            });
    }, [blockId, elementId]);

    return (
        <div className={styles.container} id={elementId} />
    );
}
