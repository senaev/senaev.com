import Link from 'next/link';

// eslint-disable-next-line no-restricted-exports -- page
export default function Page() {
    return (
        <ul>
            <li>
                {'Advertisement'}
                <ul>
                    <li>
                        <Link href={'/adv/yandex/standard-formats'}>{'Yandex standard formats'}</Link>
                    </li>
                    <li>
                        <Link href={'/adv/air/standard-formats'}>{'Air standard formats'}</Link>
                    </li>
                    <li>
                        <Link href={'/adv/google/standard-formats'}>{'Google standard formats'}</Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}
