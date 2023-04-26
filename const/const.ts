import type { Metadata } from 'next';

export const SENAEV_FULL_NAME = 'Andrei Senaev';
export const SENAEV_SITE_TITLE = `${SENAEV_FULL_NAME} - personal website`;

export const SENAEV_EMAIL = 'andrei@senaev.com';
export const SENAEV_PHONE = '+79826990400';
export const SENAEV_SITE_DOMAIN = 'senaev.com';
export const SENAEV_SITE_URL = `https://${SENAEV_SITE_DOMAIN}`;
export const ME_PAGE_LINK = '/me';

export const SENAEV_SITE_IMAGE_URL = `https://og-image.vercel.app/${encodeURI(SENAEV_SITE_TITLE)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`;

export const SENAEV_SITE_METADATA: Metadata = {
    title: SENAEV_SITE_TITLE,
    description: SENAEV_SITE_TITLE,
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: SENAEV_SITE_TITLE,
        url: SENAEV_SITE_URL,
        images: [
            {
                url: SENAEV_SITE_IMAGE_URL,
                width: 800,
                height: 600,
            },
        ],
        description: SENAEV_SITE_TITLE,
    },
    robots: {
        index: true,
    },
    other: {
        'yandex-verification': '05e701a03b47b330',
    },
};
