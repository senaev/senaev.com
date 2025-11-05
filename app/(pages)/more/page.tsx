import type { JSX } from 'react';

const SUBPAGES = {
    Administration: {
        'Google Analytics': 'https://analytics.google.com/analytics/web/#/p371912726/reports/intelligenthome',
        'Google AdSense': 'https://www.google.com/adsense/new/u/0/pub-5756750483186348/sites/list',
        'Google Search Console': 'https://search.google.com/search-console?resource_id=sc-domain%3Asenaev.com',
        'Yandex Metrika': 'https://metrika.yandex.ru/dashboard?group=day&period=week&id=93313002',
        'Yandex Advertising Network': 'https://partner.yandex.ru/v2/web/campaigns/2349763/',
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
