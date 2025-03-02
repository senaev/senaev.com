import Link from 'next/link';

import classNames from 'classnames';
import { FONT_UBUNTU_CLASSNAMES } from 'const/FONT_UBUNTU_CLASSNAMES/FONT_UBUNTU_CLASSNAMES';
import styles from './index.module.css';

const PAGES = {
    '🏠': {
        href: '/',
    },
    '💬': {
        href: '/socials',
    },
    '10x10': {
        href: '/10x10',
    },
    // 'ads': {
    //     href: '/ads',
    //     className: undefined,
    // },
    more: {
        href: '/more',
    },
};

export function Navigation (): JSX.Element {
    return (
        <nav className={classNames(styles.Navigation, FONT_UBUNTU_CLASSNAMES)}>
            {
                Object.entries(PAGES).map(([
                    text,
                    {
                        href,
                    },
                ], key) => (
                    <Link
                        key={key}
                        href={href}
                    >
                        {text}
                    </Link>
                ))
            }
        </nav>
    );
}
