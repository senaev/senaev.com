import type { Metadata } from 'next';

export const SENAEV_FULL_NAME = 'Andrei Senaev';
export const SENAEV_SITE_TITLE = `${SENAEV_FULL_NAME} - personal website`;

export const SENAEV_EMAIL = 'gsacryfice@gmail.com';
export const SENAEV_EMAIL_LINK = `mailto:${SENAEV_EMAIL}`;

export const SENAEV_PHONE = '+79826990400';
export const SENAEV_PHONE_LINK = `tel:${SENAEV_PHONE}`;

export const SENAEV_LOCATION = 'Belgrade, Serbia';

export const SENAEV_SITE_DOMAIN = 'senaev.com';
export const SENAEV_SITE_URL = `https://${SENAEV_SITE_DOMAIN}`;
export const ME_PAGE_LINK = '/me';

export const SENAEV_SITE_IMAGE_URL = '/img/avatar-head.jpeg';

type Contact = {
    header: string;
    title: string;
    link?: string;
}

export const SENEAV_CONTACTS: Contact[] = [
    {
        header: 'Email',
        title: SENAEV_EMAIL,
        link: SENAEV_EMAIL_LINK,
    },
    {
        header: 'Phone',
        title: SENAEV_PHONE,
        link: SENAEV_PHONE_LINK,
    },
    {
        header: 'Location',
        title: SENAEV_LOCATION,
    },
    {
        header: 'Website',
        title: SENAEV_SITE_DOMAIN,
        link: SENAEV_SITE_URL,
    },
];

type Education = {
    since: number;
    until: number;
    school: string;
    schoolLink: string;
    degree: string;
};
export const SENAEV_EDUCATIONS: Education[] = [
    {
        since: 2012,
        until: 2016,
        school: 'Ural Federal University',
        schoolLink: 'https://urfu.ru/en/',
        degree: 'Management in Technical Systems',
    },
    {
        since: 2005,
        until: 2009,
        school: 'Ural Radio Engineering College',
        schoolLink: 'https://urtt.ru/',
        degree: 'Computer Equipment & Networks',
    },
];

export const SENAEV_SITE_METADATA: Metadata = {
    title: SENAEV_SITE_TITLE,
    description: SENAEV_SITE_TITLE,
    metadataBase: new URL(SENAEV_SITE_URL),
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
