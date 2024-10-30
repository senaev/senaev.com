

import { MarkdownContainer } from 'components/MarkdownContainer';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { prepareMarkdownContentForNote } from 'utils/prepareMarkdownContentForNote';

const marked = new Marked({
    gfm: true, 
    breaks: true,
    async: true,
});

marked.use(gfmHeadingId());
marked.use(markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      
        return hljs.highlight(code, { language }).value;
    }
  }));

export async function renderNoteByMarkdownContent({ markdownContent }: { markdownContent: string }) {
    const preparedMarkdownContent = await prepareMarkdownContentForNote(markdownContent);

    // Use remark to convert markdown into HTML string
    const processedContent = await marked.parse(preparedMarkdownContent);
    const contentHtml = processedContent.toString();

    return <MarkdownContainer contentHtml={ contentHtml } />;
}
