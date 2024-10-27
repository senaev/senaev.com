

import { MarkdownContainer } from 'components/MarkdownContainer';
import { remark } from 'remark';
import html from 'remark-html';
import { prepareMarkdownContentForNote } from 'utils/prepareMarkdownContentForNote';

export async function renderNoteByMarkdownContent({ markdownContent }: { markdownContent: string }) {
    const preparedMarkdownContent = await prepareMarkdownContentForNote(markdownContent);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(preparedMarkdownContent);
    const contentHtml = processedContent.toString();

    return <MarkdownContainer contentHtml={ contentHtml } />;
}
