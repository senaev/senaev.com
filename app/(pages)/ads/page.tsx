import Link from 'next/link';

const SUBPAGES = {
    Yandex: {
        'Standard formats': '/ads/yandex/standard-formats',
        'Adaptive size': '/ads/yandex/adaptive-size',
    },
    Air: {
        'Standard formats': '/ads/air/standard-formats',
    },
    Google: {
        'Standard formats': '/ads/google/standard-formats',
    },
    Prebid: {
        'Default example': '/ads/prebid/default-example',
        'Yandex example (no ad server)': '/ads/prebid/yandex-example-without-ad-server',
        'Yandex example (self-build prebid script)': '/ads/prebid/yandex-example-self-build-prebid-script',
        'Senaev (with Topics Api iframe sync)': '/ads/prebid/senaev-with-topics-api-iframe-sync',
        'Senaev (with Topics Api fetch sync)': '/ads/prebid/senaev-with-topics-api-fetch-sync',
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
                                    <Link href={address}>
                                        {page}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            }
        </ul>
    );
}
