import Link from 'next/link';

export default function Page() {
    return (
        <ul>
            <li>
                {'Yandex'}
                <ul>
                    <li>
                        <Link href={'/adv/yandex/standard-formats'}>{'Standard formats'}</Link>
                    </li>
                    <li>
                        <Link href={'/adv/yandex/adaptive-size'}>{'Adaptive size'}</Link>
                    </li>
                </ul>
            </li>
            <li>
                {'Air'}
                <ul>
                    <li>
                        <Link href={'/adv/air/standard-formats'}>{'Standard formats'}</Link>
                    </li>
                </ul>
            </li>
            <li>
                {'Google'}
                <ul>
                    <li>
                        <Link href={'/adv/google/standard-formats'}>{'Standard formats'}</Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}
