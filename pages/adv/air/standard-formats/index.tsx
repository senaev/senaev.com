/* eslint-disable eslint-comments/disable-enable-pair -- TODO remove */
/* eslint-disable logical-assignment-operators -- TODO remove */
/* eslint-disable @typescript-eslint/no-unsafe-call  -- TODO remove */
/* eslint-disable @typescript-eslint/no-unsafe-assignment  -- TODO remove */
/* eslint-disable @typescript-eslint/no-explicit-any  -- TODO remove */
/* eslint-disable no-restricted-globals  -- TODO remove */
/* eslint-disable @typescript-eslint/no-unsafe-member-access  -- TODO remove */
/* eslint-disable @typescript-eslint/no-unsafe-return  -- TODO remove  */
import { useEffect } from 'react';

declare const Ya: any;
declare const yaContextCb: any;

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
        const callback = () => Ya.Context.AdvManager.render({
            blockId,
            renderTo: elementId,
        });

        const win: any = window;
        win.yaContextCb = win.yaContextCb || [];

        if (typeof Ya !== 'undefined' && Ya.Context) {
            callback();
        } else {
            yaContextCb.push(callback);
        }
    }, [blockId, elementId]);

    return (
        <div style={{
            width, height: height + 45,
        }}>
            <script src={'https://air.tech/ads/scripts/loader.js'} async={true}></script>
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
