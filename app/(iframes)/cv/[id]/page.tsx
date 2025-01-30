import classNames from 'classnames';
import { ErrorPage } from 'components/ErrorPage';
import {
    SENAEV_AVAILABLE_CV_VERSIONS,
    SENAEV_EDUCATIONS,
    SENEAV_CONTACTS,
} from 'const/const';
import { fontMerriweatherClassname } from 'const/fontMerriweatherClassname';
import { NON_BREAKING_SPACE } from 'const/NON_BREAKING_SPACE';
import Image from 'next/image';
import { resolve } from 'path';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';
import { getNoteByFilePath } from 'utils/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'utils/Notes/renderNoteByMarkdownContent';
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

    return <div className={classNames('container', fontMerriweatherClassname)}>
        <aside className={'sidebar'}>
            <div className={'avatar-container'}>
                <Image
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    src={'/img/avatar-head.webp'}
                    alt={'Profile Picture'}
                />
            </div>
            <div className={'sidebar-content'}>
                <div>
                    <div>
                        <h1>
                            {'Andrei Senaev'}
                        </h1>
                        <p className={'title'}>
                            {'Frontend Engineer, Team Leader'}
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
                        {'Education'}
                    </h2>
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
            {markdownComponent}
        </main>
    </div>;
}
