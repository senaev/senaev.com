import type { JSX } from 'react';

const SUBPAGES = {
    Administration: {
        '🟢 Uptime Robot': 'https://stats.uptimerobot.com/mL37XfpFU7',
    },
};

export default function Page (): JSX.Element {
    return (
        <ul>
            {
                Object.entries(SUBPAGES).map(([
                    chapter,
                    pages,
                ], chapterIndex) => (
                    <li key={chapterIndex}>
                        {chapter}
                        <ul>
                            {Object.entries(pages).map(([
                                page,
                                address,
                            ], pageIndex) => (
                                <li key={pageIndex}>
                                    <a
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                        href={address}
                                    >
                                        {page}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            }
        </ul>
    );
}
