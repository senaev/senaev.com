/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import clsx from 'clsx';
import {
    useEffect, useRef, type JSX,
} from 'react';

import styles from './index.module.css';

function getRandomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

const MIN_CONTAINER_WIDTH = 100;
const MIN_CONTAINER_HEIGHT = 100;

export default function Page (): JSX.Element {
    const resizableContainerRef = useRef<HTMLDivElement | null>(null);
    const bannerFrameRef = useRef<HTMLIFrameElement | null>(null);
    const sizerRightRef = useRef<HTMLDivElement | null>(null);
    const sizerBottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    // eslint-disable-next-line no-restricted-globals -- ignore
        const doc = document;
        // eslint-disable-next-line no-restricted-globals -- ignore
        const win = window;

        if (!resizableContainerRef.current) {
            return;
        }
        const resizableContainer = resizableContainerRef.current;

        if (!bannerFrameRef.current) {
            return;
        }
        const bannerFrame = bannerFrameRef.current;

        if (!sizerRightRef.current) {
            return;
        }
        const sizerRight = sizerRightRef.current;

        if (!sizerBottomRef.current) {
            return;
        }
        const sizerBottom = sizerBottomRef.current;

        let startHeight = NaN;
        let startWidth = NaN;

        const reloadIframe = (): void => {
            const src = new URL(bannerFrame.src);

            src.searchParams.set('rnd', String(getRandomInt(100000, 999999)));

            bannerFrame.src = src.toString();
        };

        const coords = {
            x: Infinity,
            y: Infinity,
        };

        function doDrag (event: MouseEvent): void {
            let width = startWidth + ((event.clientX - coords.x) * 2);
            let height = startHeight + event.clientY - coords.y;

            if (width <= MIN_CONTAINER_WIDTH) {
                width = MIN_CONTAINER_WIDTH;
            }

            if (height <= MIN_CONTAINER_HEIGHT) {
                height = MIN_CONTAINER_HEIGHT;
            }

            sizerRight.innerText = String(height);
            sizerBottom.innerText = String(width);

            resizableContainer.style.width = `${width}px`;
            resizableContainer.style.height = `${height}px`;
        }

        function stopDrag (): void {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            resizableContainer.classList.remove(styles.resizable!);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            doc.body.classList.remove(styles.noUserSelect!);

            doc.removeEventListener('mousemove', doDrag, false);
            doc.removeEventListener('mouseup', stopDrag, false);

            reloadIframe();
        }

        sizerRight.innerText = String(bannerFrame.offsetHeight);
        sizerBottom.innerText = String(bannerFrame.offsetWidth);

        const handle = doc.createElement('div');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
        handle.classList.add(styles.handle!);
        resizableContainer.appendChild(handle);

        handle.addEventListener('mousedown', (event: MouseEvent) => {
            coords.x = event.clientX;
            coords.y = event.clientY;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            doc.body.classList.add(styles.noUserSelect!);

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
            resizableContainer.classList.add(styles.resizable!);

            startWidth = parseInt(win.getComputedStyle(resizableContainer).width, 10);
            startHeight = parseInt(win.getComputedStyle(resizableContainer).height, 10);

            doc.addEventListener('mousemove', doDrag, false);
            doc.addEventListener('mouseup', stopDrag, false);
        }, false);
    });

    return (
        <div id={'app'}>
            <div className={styles.container}>
                <div
                    className={styles['resizable-container']}
                    ref={resizableContainerRef}
                >
                    <div
                        ref={sizerRightRef}
                        className={clsx(styles.sizer, styles.sizer_right)}
                    >
                        {'###'}
                    </div>
                    <div className={styles['frame-wrapper']}>
                        <iframe
                            ref={bannerFrameRef}
                            title={'adaptive-iframe'}
                            className={styles.iframe}
                            src={'/iframes/adaptive-size'}
                            name={'banner-frame'}
                        />
                    </div>
                    <div
                        ref={sizerBottomRef}
                        className={clsx(styles.sizer, styles.sizer_bottom)}
                    >
                        {'###'}
                    </div>
                </div>
            </div>
        </div>
    );
}
