import type { Metadata } from 'next';

export const SENAEV_FULL_NAME = 'Andrei Senaev';
export const SENAEV_SITE_TITLE = `${SENAEV_FULL_NAME} - personal website`;

export const SENAEV_EMAIL = 'gsacryfice@gmail.com';
export const SENAEV_EMAIL_LINK = `mailto:${SENAEV_EMAIL}`;

export const SENAEV_PHONE = '+79826990400';
export const SENAEV_PHONE_LINK = `tel:${SENAEV_PHONE}`;

export const SENAEV_LOCATION = 'Belgrade, Serbia';

export const SENAEV_TELEGRAM_NICKNAME = 'senaev';
export const SENAEV_TELEGRAM_LINK = `https://t.me/${SENAEV_TELEGRAM_NICKNAME}`;
export const SENAEV_SITE_DOMAIN = 'senaev.com';
export const SENAEV_SITE_URL = `https://${SENAEV_SITE_DOMAIN}`;
export const ME_PAGE_LINK = '/me';

export const SENAEV_SITE_IMAGE_URL = '/img/avatar-head.webp';

export const SENAEV_ELEVATOR_PITCH = [
    'I\'m a Frontend Engineering Leader with over a decade of revenue-driven experience in Ad Tech and Digital Media. At Yandex, I advanced from developer to team leader, where I managed video advertising technology.',
    'Recently, I built and led a 20+ person international team developing a new advertising network—establishing the architecture from scratch.',
    'Throughout my career, I\'ve conducted 250+ interviews, hired 20+ team members, delivered major public presentations, and maintained an unwavering focus on creating measurable business results.',
];

export const SENAEV_AVAILABLE_CV_VERSIONS = [
    {
        name: 'Short',
        id: '1min',
    },
    {
        name: 'Detailed',
        id: '5min',
    },
    {
        name: 'Full story',
        id: '15min',
    },
];

export const SENAEV_CURRENT_DUTY = 'Team Leader of Yandex International Advertising Interfaces';
export const SENAEV_CURRENT_DUTY_SHORT = 'Frontend Engineer, Team Leader';

type Contact = {
    header: string;
    title: string;
    link?: string;
}

export const SENAEV_SOCIALS: {
    name: string;
    link: string;
}[] = [
    {
        name: '@senaev_speaks (telegram)',
        link: 'https://t.me/senaev_speaks',
    },
    {
        name: '@senaev_speaks (web)',
        link: '/notes/all_senaev_speaks_posts',
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/senaev/',
    },
    {
        name: 'Habr',
        link: 'https://habr.com/ru/users/senaev/articles/',
    },
    {
        name: 'GitHub',
        link: 'https://github.com/senaev',
    },
    {
        name: 'X (Twitter)',
        link: 'https://x.com/senaev',
    },
    {
        name: '@senaev_career (teletype)',
        link: 'https://teletype.in/@senaev_career',
    },
    {
        name: '@senaev_tech (teletype)',
        link: 'https://teletype.in/@senaev_tech',
    },
];

export const SENEAV_CONTACTS: Contact[] = [
    {
        header: 'Website',
        title: SENAEV_SITE_DOMAIN,
        link: SENAEV_SITE_URL,
    },
    {
        header: 'Telegram',
        title: `@${SENAEV_TELEGRAM_NICKNAME}`,
        link: SENAEV_TELEGRAM_LINK,
    },
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
];

type Education = {
    since: number;
    until: number;
    school: string;
    schoolLink: string;
    degree: string;
    level: string;
};
export const SENAEV_EDUCATIONS: Education[] = [
    {
        since: 2012,
        until: 2016,
        school: 'Ural Federal University',
        schoolLink: 'https://urfu.ru/en/',
        degree: 'Management in Technical Systems',
        level: 'Bachelor’s Degree',
    },
    {
        since: 2005,
        until: 2009,
        school: 'Ural Radio Engineering College',
        schoolLink: 'https://urtt.ru/',
        degree: 'Computer Equipment & Networks',
        level: 'High School Diploma',
    },
];

export const SENAEV_LANGUAGE_LEVELS: {
    language: string;
    level: string;
}[] = [
    {
        language: 'English',
        level: 'Full Professional',
    },
    {
        language: 'Russian',
        level: 'Native',
    },
];

export const SENAEV_SKILLS: Record<string, string[]> = {
    Hard: [
        'HTML / CSS / JavaScript / TypeScript',
        'React.js / Webpack',
        'Node.js',
        'Multimedia in browser (MSE, DRM, Encoding)',
        'Jest / Selenium / Playwright',
        'A/B Testing, Availability',
        ' Browser Telemetry and Performance Optimization',

    ],
    Soft: [
        'Team Leadership / People and Project Management',
        'Hiring / Technical Interviews',
        'Mentoring',
        'Public Speaking',
    ],
};

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
