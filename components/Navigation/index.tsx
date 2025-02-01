import Link from 'next/link';

import classNames from 'classnames';
import { FONT_UBUNTU_CLASSNAMES } from 'const/FONT_MERRIWEATHER_CLASSNAMES copy/FONT_MERRIWEATHER_CLASSNAMES';
import styles from './index.module.css';

const PAGES = {
    '🏠': {
        href: '/',
        className: styles.Navigation_home,
    },
    '10x10': {
        href: '/10x10',
        className: undefined,
    },
    // 'ads': {
    //     href: '/ads',
    //     className: undefined,
    // },
    more: {
        href: '/more',
        className: undefined,
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
                        className,
                    },
                ], key) => (
                    <Link
                        key={key}
                        className={className}
                        href={href}
                    >
                        {text}
                    </Link>
                ))
            }
        </nav>
    );
}
