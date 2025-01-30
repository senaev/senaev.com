import classNames from 'classnames';
import {
    SENAEV_EMAIL, SENAEV_EMAIL_ADDRESS, SENAEV_LOCATION, SENAEV_PHONE,
    SENAEV_PHONE_ADDRESS,
    SENAEV_SITE_DOMAIN,
    SENAEV_SITE_URL,
} from 'const/const';
import { fontMerriweatherClassname } from 'const/fontMerriweatherClassname';
import { NON_BREAKING_SPACE } from 'const/NON_BREAKING_SPACE';
import Image from 'next/image';
import { resolve } from 'path';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';
import { getNoteByFilePath } from 'utils/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'utils/Notes/renderNoteByMarkdownContent';
import './index.css';

export default async function Page (): Promise<JSX.Element> {

    const readmeFilePath = resolve(getNextJsRootDirectory(), './app/(iframes)/cv/5min.md');

    const { markdownContent } = await getNoteByFilePath({ filePath: readmeFilePath });

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <div className={classNames('container', fontMerriweatherClassname)}>
        <aside className={'sidebar'}>
            <div className={'profile-pic'}>
                <Image
                    width={100}
                    height={100}
                    src={'/img/avatar-head.jpeg'}
                    alt={'Profile Picture'}
                />
            </div>
            <h2>
                {`Andrei${NON_BREAKING_SPACE}Senaev`}
            </h2>
            <p className={'title'}>
                {`Frontend${NON_BREAKING_SPACE}Engineer,${NON_BREAKING_SPACE}Team${NON_BREAKING_SPACE}Leader`}
            </p>
            <hr/>
            <div className={'contact-info'}>
                <p>
                    <strong>
                        {'Email:'}
                    </strong>
                    {NON_BREAKING_SPACE}
                    <a href={SENAEV_EMAIL_ADDRESS}>
                        {SENAEV_EMAIL}
                    </a>
                </p>
                <p>
                    <strong>
                        {'Phone:'}
                    </strong>
                    {NON_BREAKING_SPACE}
                    <a href={SENAEV_PHONE_ADDRESS}>
                        {SENAEV_PHONE}
                    </a>

                </p>
                <p>
                    <strong>
                        {'Location:'}
                    </strong>
                    {NON_BREAKING_SPACE}
                    {SENAEV_LOCATION}
                </p>
                <p>
                    <strong>
                        {'Website:'}
                    </strong>
                    {NON_BREAKING_SPACE}
                    <a href={SENAEV_SITE_URL}>
                        {SENAEV_SITE_DOMAIN}
                    </a>
                </p>
            </div>
        </aside>

        <main className={'content'}>
            <div className={'job'}>
                {markdownComponent}
            </div>
        </main>
    </div>;
}
