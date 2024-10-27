import { ErrorPage } from 'components/ErrorPage';
import { getNoteByFilePath } from 'components/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'components/Notes/renderNoteByMarkdownContent';
import { notFound } from 'next/navigation';
import { resolve } from 'path';
import { pathExists } from 'path-exists';
import { findFileInFolder } from 'utils/Files/findFileInFolder';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';

import styles from './index.module.css';

const NOTES_FOLDER = process.env.NOTES_FOLDER || resolve(getNextJsRootDirectory(), 'notes-folder');

export default async function Page({
    params,
}: {
    params: Promise<{id: string}>}) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    const doesNotedDirectoryExist = await pathExists(NOTES_FOLDER);
    if (!doesNotedDirectoryExist) {
        return <ErrorPage message={'NOTES_FOLDER does not exist'}/>;
    }

    const filePath = await findFileInFolder(NOTES_FOLDER, `${decodedId}.md`);

    if (!filePath) {
        return notFound();
    }

    const {
        markdownContent,
        isPublic,
    } = await getNoteByFilePath({ filePath });

    if (!isPublic) {
        return notFound();
    }

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <main className={styles.NotePage__main}>
        <article>
            {markdownComponent}
        </article>
    </main>;
}
