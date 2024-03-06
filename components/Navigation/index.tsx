import Link from 'next/link';

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
    'more': {
        href: '/more',
        className: undefined,
    },
};

export function Navigation() {
    return (
        <nav className={styles.Navigation}>
            {
                Object.entries(PAGES).map(([
                    text, {
                        href,
                        className,
                    },
                ], key) => {
                    return (
                        <Link
                            key={key}
                            className={className}
                            href={href}
                        >
                            {text}
                        </Link>
                    );
                })
            }
        </nav>
    );
}
