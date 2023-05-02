import Image from 'next/image';
import clsx from 'clsx';

import styles from './index.module.css';

import { SENAEV_FULL_NAME } from 'const/const';
import { BusinessCardAbout } from 'components/BusinessCardAbout';

const PHOTO_SIZE_BIG = 144;

export function BusinessCard() {
    return (
        <div
            className={clsx(styles.container)}
        >
            <div className={styles.leftSide}>
                <Image
                    priority={true}
                    src={'/img/avatar-head.jpg'}
                    className={styles.avatarImage}
                    height={PHOTO_SIZE_BIG}
                    width={PHOTO_SIZE_BIG}
                    alt={SENAEV_FULL_NAME}
                />
            </div>
            <div className={styles.centralSeparator}>
                <div className={styles.centralSeparator_line} />
            </div>
            <div className={styles.rightSide}>
                <BusinessCardAbout />
            </div>
        </div>
    );
}
