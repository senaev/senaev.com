import { useEffect } from 'react';

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

function AdUnit({
    size,
    blockId,
}: {
    size: {
        width: number;
        height: number;
    };
    blockId: string;
}) {
    const { width, height } = size;

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
        <div style={{
            width, height: height + 45,
        }}>
            <h3>{`${width}x${height}`}</h3>
            <div
                style={{
                    width, height,
                }}
                id={elementId}
            />
        </div>
    );
}

// eslint-disable-next-line no-restricted-exports -- page
export default function Page() {
    return (
        <AdUnit
            size={{
                width: 320,
                height: 180,
            }}
            blockId={'R-A-2349763-1'}
        />
    );
}
