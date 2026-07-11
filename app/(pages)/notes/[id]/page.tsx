import classNames from 'classnames';
import { SENAEV_FULL_NAME } from 'const/const';
import { FONT_MERRIWEATHER_CLASSNAMES } from 'const/FONT_MERRIWEATHER_CLASSNAMES/FONT_MERRIWEATHER_CLASSNAMES';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNoteFromRemote } from 'utils/Notes/getNoteFromRemote';
import { renderNoteByMarkdownContent } from 'utils/Notes/renderNoteByMarkdownContent';
import styles from './index.module.css';

type NotePageProps = {
    params: Promise<{id: string}>
};

export async function generateMetadata({
    params,
}: NotePageProps): Promise<Metadata> {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    return {
        title: `${decodedId} - ${SENAEV_FULL_NAME}`,
    };
}

export default async function Page({
    params,
}: NotePageProps) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    const markdownContent = await getNoteFromRemote(decodedId);

    if (markdownContent === null) {
        return notFound();
    }

    const markdownComponent = await renderNoteByMarkdownContent({ markdownContent });

    return <div className={styles.NotePage_container}>
        <main className={classNames(styles.NotePage__main, FONT_MERRIWEATHER_CLASSNAMES)}>
            <article className={styles.NotePage__article}>
                {markdownComponent}
            </article>
        </main>
    </div>;
}
