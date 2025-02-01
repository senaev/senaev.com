import classNames from 'classnames';
import { ErrorPage } from 'components/ErrorPage';
import { MarkdownHeader } from 'components/MarkdownHeader';
import {
    SENAEV_ABOUT_ME_INFO,
    SENAEV_AVAILABLE_CV_VERSIONS,
    SENAEV_CURRENT_DUTY_SHORT,
    SENAEV_EDUCATIONS,
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

const AVATAR_SIZE = 150;

export default async function Page ({
    params,
}: {
    params: Promise<{id: string}>
}): Promise<JSX.Element> {
    const { id } = await params;

    if (!SENAEV_AVAILABLE_CV_VERSIONS.includes(id)) {
        return <ErrorPage message={`CV with id=[${id}] doesn't exist`}/>;
    }

    const readmeFilePath = resolve(getNextJsRootDirectory(), `./public/cv/${id}.md`);

    const { markdownContent } = await getNoteByFilePath({ filePath: readmeFilePath });

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <div className={classNames('container', FONT_MERRIWEATHER_CLASSNAMES)}>
        <aside className={'sidebar'}>
            <div className={'avatar-container'}>
                <Link href={'/'}>
                    <Image
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        src={'/img/avatar-head.webp'}
                        alt={'Profile Picture'}
                    />
                </Link>
            </div>
            <div className={'sidebar-content'}>
                <div>
                    <div>
                        <h1>
                            {'Andrei Senaev'}
                        </h1>
                        <p className={'title'}>
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
                        <li>
                            {'English'}
                        </li>
                        <li>
                            {'Russian'}
                        </li>
                    </ul>
                </div>
            </div>
        </aside>

        <main className={'content'}>
            <MarkdownHeader
                depth={2}
                id={'about-me'}
                text={'About Me'}
            />
            {
                SENAEV_ABOUT_ME_INFO.map((info, i) => <p key={i}>
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
                }, i) => <div
                    className={'education-item'}
                    key={i}
                >
                    <p>
                        {`${since}–${until}`}
                    </p>
                    <p>
                        <strong>
                            {degree}
                        </strong>
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
                ]) => <>
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
                </>)
            }
        </main>
    </div>;
}
