'use client';

import { useEffect } from 'react';

import styles from './index.module.css';

import { once } from 'utils/Function/once';
import { loadScript } from 'utils/Script/loadScript';

declare const Ya: {
    Context: {
        AdvManager: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
            render: (arg: any) => void;
        };
    };
};

const loadContextScript = once((): Promise<void> => loadScript('https://yandex.ru/ads/system/context.js'));

export function YandexAdUnit({
    blockId,
}: {
    blockId: string;
}) {
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
