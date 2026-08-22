import type { Metadata } from 'next';

export const SENAEV_FULL_NAME = 'Andrei Senaev';
export const SENAEV_SITE_TITLE = `${SENAEV_FULL_NAME} - personal website`;

export const SENAEV_EMAIL = 'andrei.senaev@gmail.com';
export const SENAEV_EMAIL_LINK = `mailto:${SENAEV_EMAIL}`;

export const SENAEV_PHONE = '+79826990400';
export const SENAEV_PHONE_LINK = `tel:${SENAEV_PHONE}`;

export const SENAEV_LOCATION = 'Madrid, Spain';

export const SENAEV_TELEGRAM_NICKNAME = 'senaev';
export const SENAEV_TELEGRAM_LINK = `https://t.me/${SENAEV_TELEGRAM_NICKNAME}`;
export const SENAEV_SITE_DOMAIN = 'senaev.com';
export const SENAEV_SITE_URL = `https://${SENAEV_SITE_DOMAIN}`;
export const ME_PAGE_LINK = '/me';

export const SENAEV_SITE_IMAGE_URL = '/img/avatar-head.webp';

export const SENAEV_ELEVATOR_PITCH = [
    'I\'m a Senior Full-Stack Engineer with over a decade of building revenue-critical systems in Ad Tech, Digital Media and Observability. At Datadog, I work on Flex Logs—a multi-tenant, multi-datacenter log storage that keeps petabyte-scale data queryable on demand.',
    'At Yandex, I owned the video advertising player used across all Yandex services: I wrote the creative rendering system that made half of the legacy inventory twice as fast, built the infrastructure that recovered about 12% of video ad revenue lost to ad blockers, and authored the video creative standard still used company-wide.',
    'I then spent three years building a new international advertising network from scratch—defining its architecture, and growing the team that delivered it to 20+ engineers. Along the way I conducted 250+ interviews, hired 50+ engineers, and delivered major public presentations.',
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
];

export const SENAEV_CURRENT_DUTY = 'Senior Full-Stack Engineer at Datadog';
export const SENAEV_CURRENT_DUTY_SHORT = 'Senior Full-Stack Engineer';

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
        'Distributed Storage and Query Systems at Scale',
        'Observability (Logs, Metrics, Tracing)',
        'Java / Kotlin / Go',
        'Kubernetes / Docker / Terraform',
        'TypeScript / JavaScript / Node.js',
        'React.js / Webpack / HTML / CSS',
        'Performance Optimization and Telemetry',
        'A/B Testing, Availability, Incident Response',
        'Multimedia in browser (MSE, DRM, Encoding)',
        'Jest / Selenium / Playwright',

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
