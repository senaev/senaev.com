import { getNoteByFilePath } from 'components/Notes/getNoteByFilePath';
import { renderNoteByMarkdownContent } from 'components/Notes/renderNoteByMarkdownContent';
import { resolve } from 'path';
import { getNextJsRootDirectory } from 'utils/getNextJsRootDirectory';

import styles from './index.module.css';

export default async function Page (): Promise<JSX.Element> {
    const readmeFilePath = resolve(getNextJsRootDirectory(), './README.md');

    const { markdownContent } = await getNoteByFilePath({ filePath: readmeFilePath });

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <div className={styles.Home__markdownContent}>
        {markdownComponent}
    </div>;
}
