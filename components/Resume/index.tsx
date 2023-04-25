import Image from 'next/image';

import styles from './index.module.css';

import { SENAEV_FULL_NAME } from 'const/const';

export function Resume() {
    return (
        <div>
            <header className={styles.header}>
                <Image
                    priority={true}
                    src={'/img/avatar-head.jpg'}
                    className={styles.borderCircle}
                    height={144}
                    width={144}
                    alt={''}
                />
                <h1 className={styles.heading2Xl}>{SENAEV_FULL_NAME}</h1>
            </header>
            <main>
                <section className={styles.headingMd}>
                    <p>{'Ambitious, enthusiastic, a fan of my job.'}</p>
                    <p>
                        {'I am driven by the desire for constant professional and personal'}
                        {'growth.'}
                    </p>
                    <p>
                        {'My goal is to make a significant contribution to the IT industry.'}
                    </p>
                    <p>
                        {'Specialist at the intersection of multimedia and advertising'}
                        {'technologies.'}
                    </p>
                </section>
            </main>
        </div>
    );
}
