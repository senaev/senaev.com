

import { MarkdownContainer } from 'components/MarkdownContainer';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { prepareMarkdownContentForNote } from 'utils/prepareMarkdownContentForNote';

const marked = new Marked({
    gfm: true,
    breaks: true,
    async: true,
});

marked.use({
    renderer: {
        heading({
            raw,
            depth,
            tokens,
        }) {
            const slugger = new GithubSlugger();
            const text = this.parser.parseInline(tokens);
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

            const id = slugger.slug(raw.trim().split(' ').splice(1).join(' ').toLowerCase());

            return `
              <h${depth} id="${id}">
                <a name="${escapedText}" class="MarkdownContainer_anchor" href="#${escapedText}">
                  #
                </a>
                ${text}
              </h${depth}>`;
        },
    },
});

marked.use(markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';

        return hljs.highlight(code, { language }).value;
    },
}));

export async function renderNoteByMarkdownContent({ markdownContent }: { markdownContent: string }) {
    const preparedMarkdownContent = await prepareMarkdownContentForNote(markdownContent);

    // Use remark to convert markdown into HTML string
    const processedContent = await marked.parse(preparedMarkdownContent);
    const contentHtml = processedContent.toString();

    return <MarkdownContainer contentHtml={ contentHtml } />;
}
