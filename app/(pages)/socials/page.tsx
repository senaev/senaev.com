import {
    SENAEV_SOCIALS,
} from 'const/const';

export default async function Page (): Promise<JSX.Element> {
    return <div style={{ padding: '1em' }}>
        {
            SENAEV_SOCIALS.map(({
                name,
                link,
            }, i) => <div
                key={i}
                style={{
                    margin: '0.5em',
                }}
            >
                {'• '}
                <a
                    href={link}
                    target={'_blank'}
                    rel={'noreferrer'}
                >
                    {name}
                </a>
            </div>)
        }
    </div>;
}
