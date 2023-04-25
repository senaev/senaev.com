import { SENAEV_SITE_TITLE } from 'const/const';

// eslint-disable-next-line no-restricted-exports -- page
export default function Head() {
    return (
        <>
            <title>{SENAEV_SITE_TITLE}</title>
            <link rel={'icon'} href={'/favicon.ico'} />
            <meta name={'description'} content={SENAEV_SITE_TITLE} />
            <meta
                property={'og:image'}
                content={`https://og-image.vercel.app/${encodeURI(SENAEV_SITE_TITLE)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name={'og:title'} content={SENAEV_SITE_TITLE} />
            <meta name={'twitter:card'} content={'summary_large_image'} />
        </>
    );
}
