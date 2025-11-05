import type { JSX } from 'react';

export default function Page (): JSX.Element {
    return (
        <div>
            {'On this page, you can test difference between'}
            <code>
                {'fencedframe'}
            </code>
            {'and'}
            <code>
                {'iframe'}
            </code>
        </div>
    );
}
