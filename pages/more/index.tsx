import Link from 'next/link';

// eslint-disable-next-line no-restricted-exports -- page
export default function Page() {
    return (
        <ul>
            <li>
                {'Administration'}
                <ul>
                    <li>
                        <Link href={'https://analytics.google.com/analytics/web/#/p371912726/reports/intelligenthome'}>{'Google Analytics'}</Link>
                    </li>
                    <li>
                        <Link href={'https://metrika.yandex.ru/dashboard?group=day&period=week&id=93313002'}>{'Yandex Metrika'}</Link>
                    </li>
                    <li>
                        <Link href={'https://partner.yandex.ru/v2/web/campaigns/2349763/'}>{'Yandex Advertising Network'}</Link>
                    </li>
                    <li>
                        <Link href={'https://www.google.com/adsense/new/u/0/pub-5756750483186348/sites/list'}>{'Google AdSense'}</Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}
