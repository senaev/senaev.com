import classNames from 'classnames';
import {
    SENAEV_ABOUT_ME_INFO,
    SENAEV_AVAILABLE_CV_VERSIONS, SENAEV_CURRENT_DUTY, SENAEV_FULL_NAME, SENEAV_CONTACTS,
} from 'const/const';
import { FONT_MERRIWEATHER_CLASSNAMES } from 'const/FONT_MERRIWEATHER_CLASSNAMES/FONT_MERRIWEATHER_CLASSNAMES';
import { NON_BREAKING_SPACE } from 'const/NON_BREAKING_SPACE';
import Image from 'next/image';
import Link from 'next/link';
import './index.css';
import styles from './index.module.css';

const AVATAR_SIZE = 150;

export default async function Page (): Promise<JSX.Element> {
    return <main className={classNames(styles.MainPage__container, FONT_MERRIWEATHER_CLASSNAMES)}>
        <div className={styles.MainPage__container_center}>
            <div className={styles.MainPage__photoAndTitle}>
                <div className={styles.MainPage__avatarContainer}>
                    <Image
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        src={'/img/avatar-head.webp'}
                        alt={'Profile Picture'}
                    />
                </div>
                <div className={styles.MainPage__title}>
                    <h1>
                        {SENAEV_FULL_NAME}
                    </h1>
                    <p>
                        {SENAEV_CURRENT_DUTY}
                    </p>
                </div>
            </div>
            <div>
                <h2>
                    {'About Me'}
                </h2>
                {
                    SENAEV_ABOUT_ME_INFO.map((info, i) => <p key={i}>
                        {info}
                    </p>)
                }
            </div>
            <div className={styles.MainPage__contactsAndCv}>
                <div>
                    <h2>
                        {'Contacts'}
                    </h2>
                    {
                        SENEAV_CONTACTS.map(({
                            header,
                            title,
                            link,
                        }, i) => <div
                            key={i}
                        >
                            {`${header}:`}
                            {NON_BREAKING_SPACE}
                            {
                                link
                                    ? <a
                                        href={link}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                    >
                                        {title}
                                    </a>
                                    : title
                            }
                        </div>)
                    }
                </div>
                <div className={styles.MainPage__resumeContainer}>
                    <h2>
                        {'Resume'}
                    </h2>
                    <div>
                        {
                            SENAEV_AVAILABLE_CV_VERSIONS.map((version, i) => <div key={i}>
                                {'• '}
                                <Link href={`/cv/${version}`}>
                                    {version}
                                </Link>
                                {' '}
                                {'version'}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </main>;
}
