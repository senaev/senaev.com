import { ErrorPage } from 'components/ErrorPage';
import { NOTES_FILE_MANAGER } from 'const/NOTES_FILE_MANAGER';
import { NOTES_FOLDER } from 'const/NOTES_FOLDER';
import { notFound } from 'next/navigation';
import { pathExists } from 'path-exists';
import { getNoteByFilePath } from 'utils/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'utils/Notes/renderNoteByMarkdownContent';
import styles from './index.module.css';


export default async function Page({
    params,
}: {
    params: Promise<{id: string}>
}) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    const doesNotesDirectoryExist = await pathExists(NOTES_FOLDER);
    if (!doesNotesDirectoryExist) {
        return <ErrorPage message={'NOTES_FOLDER does not exist'}/>;
    }


    const file = await NOTES_FILE_MANAGER.findFile(`${decodedId}.md`);

    if (!file) {
        return notFound();
    }

    const { path: filePath, isInPublicFolder } = file;

    if (!isInPublicFolder) {
        return notFound();
    }

    const {
        markdownContent,
    } = await getNoteByFilePath({ filePath });

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <main className={styles.NotePage__main}>
        <article>
            {markdownComponent}
        </article>
    </main>;
}
