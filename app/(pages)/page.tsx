import classNames from 'classnames';
import {
    SENAEV_AVAILABLE_CV_VERSIONS, SENAEV_FULL_NAME, SENEAV_CONTACTS,
} from 'const/const';
import { fontMerriweatherClassname } from 'const/fontMerriweatherClassname';
import { NON_BREAKING_SPACE } from 'const/NON_BREAKING_SPACE';
import Image from 'next/image';
import Link from 'next/link';
import './main-page.css';

const AVATAR_SIZE = 150;

export default async function Page (): Promise<JSX.Element> {
    return <div className={classNames('main-page-container', fontMerriweatherClassname)}>
        <div className={'main-page-container-center'}>
            <div className={'main-page-photo-and-title'}>
                <div className={'main-page-avatar-container'}>
                    <Image
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        src={'/img/avatar-head.webp'}
                        alt={'Profile Picture'}
                    />
                </div>
                <div className={'main-page-title'}>
                    <h1>
                        {SENAEV_FULL_NAME}
                    </h1>
                    <p>
                        {'Team Leader of Yandex International Advertising Interfaces'}
                    </p>
                </div>
            </div>
            <div className={'main-page-contacts-and-cv'}>
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
                            className={'main-page-contact'}
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
                <div className={'main-page-resume-container'}>
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
    </div>;
}
