import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

import { SENAEV_FULL_NAME } from 'const/const';

const PHOTO_SIZE_STICKY = 48;

export function BusinessCardSticky() {
    return (
        <div
            className={styles.container}
        >
            <div className={styles.leftSide}>
                <Image
                    priority={true}
                    src={'/img/avatar-head.jpg'}
                    className={styles.avatarImage}
                    height={PHOTO_SIZE_STICKY}
                    width={PHOTO_SIZE_STICKY}
                    alt={SENAEV_FULL_NAME}
                />
            </div>
            <div className={styles.centralSeparator}>
                <div className={styles.centralSeparator_line} />
            </div>
            <div className={styles.rightSide}>
                <div>
                    <Link href={'/'}>{'Home'}</Link>
                </div>
            </div>
        </div>
    );
}
