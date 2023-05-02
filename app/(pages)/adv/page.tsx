import Link from 'next/link';

const SUBPAGES = {
    Yandex: {
        'Standard formats': '/adv/yandex/standard-formats',
        'Adaptive size': '/adv/yandex/adaptive-size',
    },
    Air: {
        'Standard formats': '/adv/air/standard-formats',
    },
    Google: {
        'Standard formats': '/adv/google/standard-formats',
    },
    Prebid: {
        'Default example': '/adv/prebid/default-example',
        'Yandex example': '/adv/prebid/yandex-example',
    },
};

export default function Page() {
    return (
        <ul>
            {
                Object.entries(SUBPAGES).map(([chapter, pages], chapterIndex) => {
                    return (
                        <li key={chapterIndex}>
                            {chapter}
                            <ul>
                                {Object.entries(pages).map(([page, address], pageIndex) => {
                                    return (
                                        <li key={pageIndex}>
                                            <Link href={address}>{page}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    );
}
