import classNames from 'classnames';
import { ErrorPage } from 'components/ErrorPage';
import { MarkdownHeader } from 'components/MarkdownHeader';
import { PrintButton } from 'components/PrintButton/PrintButton';
import {
    SENAEV_AVAILABLE_CV_VERSIONS,
    SENAEV_CURRENT_DUTY_SHORT,
    SENAEV_EDUCATIONS,
    SENAEV_ELEVATOR_PITCH,
    SENAEV_LANGUAGE_LEVELS,
    SENAEV_SKILLS,
    SENEAV_CONTACTS,
} from 'const/const';
import { FONT_MERRIWEATHER_CLASSNAMES } from 'const/FONT_MERRIWEATHER_CLASSNAMES/FONT_MERRIWEATHER_CLASSNAMES';
import { NON_BREAKING_SPACE } from 'const/NON_BREAKING_SPACE';
import Image from 'next/image';
import Link from 'next/link';
import { resolve } from 'path';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';
import { getNoteByFilePath } from 'utils/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'utils/Notes/renderNoteByMarkdownContent';
import { getObjectEntries } from 'utils/Object/getObjectEntries';
import './index.css';
import styles from './index.module.css';

const AVATAR_SIZE = 150;

export default async function Page ({
    params,
}: {
    params: Promise<{id: string}>
}): Promise<JSX.Element> {
    const { id } = await params;

    if (!SENAEV_AVAILABLE_CV_VERSIONS.find((cvVersion) => cvVersion.id === id)) {
        return <ErrorPage message={`CV with id=[${id}] doesn't exist`}/>;
    }

    const readmeFilePath = resolve(getNextJsRootDirectory(), `./public/cv/${id}.md`);

    const { markdownContent } = await getNoteByFilePath({ filePath: readmeFilePath });

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <div
        className={classNames(
            styles.Container,
            FONT_MERRIWEATHER_CLASSNAMES,
            'CvPage_container'
        )}
    >
        <aside className={styles.Sidebar}>
            <div className={styles.AvatarContainer}>
                <Link href={'/'}>
                    <Image
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        src={'/img/avatar-head.webp'}
                        alt={'Profile Picture'}
                    />
                </Link>
            </div>
            <div className={styles.SidebarContent}>
                <div>
                    <div>
                        <h1>
                            {'Andrei Senaev'}
                        </h1>
                        <p className={styles.Title}>
                            {SENAEV_CURRENT_DUTY_SHORT}
                        </p>
                    </div>
                </div>
                <div>
                    <h2>
                        {'Contact'}
                    </h2>
                    {
                        SENEAV_CONTACTS.map(({
                            header,
                            title,
                            link,
                        }, i) => <div
                            className={'contact'}
                            key={i}
                        >
                            {`${header}:`}
                            {NON_BREAKING_SPACE}
                            {
                                link
                                    ? <a
                                        href={link}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                    >
                                        {title}
                                    </a>
                                    : title
                            }
                        </div>)
                    }
                </div>
                <div>
                    <h2>
                        {'Language'}
                    </h2>
                    <ul>
                        {
                            SENAEV_LANGUAGE_LEVELS.map(({
                                language,
                                level,
                            }, i) => <li key={i}>
                                {`${language} – ${level}`}
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </aside>

        <main className={styles.Content}>
            <div className={styles.Content__noPrint}>
                <PrintButton />
            </div>
            <MarkdownHeader
                depth={2}
                id={'about-me'}
                text={'About Me'}
            />
            {
                SENAEV_ELEVATOR_PITCH.map((info, i) => <p key={i}>
                    {info}
                </p>)
            }
            {markdownComponent}
            <MarkdownHeader
                depth={2}
                id={'education'}
                text={'Education'}
            />
            {
                SENAEV_EDUCATIONS.map(({
                    since,
                    until,
                    school,
                    schoolLink,
                    degree,
                    level,
                }, i) => <div
                    className={styles.EducationItem}
                    key={i}
                >
                    <p className={styles.EducationItem__degree}>
                        <strong>
                            {degree}
                        </strong>
                        <time>
                            {`${since} – ${until}`}
                        </time>
                    </p>
                    <p>
                        <i>
                            <a
                                href={schoolLink}
                                target={'_blank'}
                                rel={'noreferrer'}
                            >
                                {school}
                            </a>

                            {NON_BREAKING_SPACE}
                            {'–'}
                            {NON_BREAKING_SPACE}

                            {level}
                        </i>
                    </p>
                </div>)
            }
            <MarkdownHeader
                depth={2}
                id={'skills'}
                text={'Skills'}
            />
            {
                getObjectEntries(SENAEV_SKILLS).map(([
                    skillCategory,
                    skillsArray,
                ], i) => <div key={i}>
                    <MarkdownHeader
                        depth={3}
                        id={`skill-category-${skillCategory}`}
                        text={skillCategory}
                    />
                    <ul>
                        {skillsArray.map((skill, i) => <li key={i}>
                            {skill}
                        </li>)}
                    </ul>
                </div>)
            }
        </main>
    </div>;
}
