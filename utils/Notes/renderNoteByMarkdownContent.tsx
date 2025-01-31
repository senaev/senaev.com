import { MarkdownContainer } from 'components/MarkdownContainer';
import { NOTES_FILE_MANAGER } from 'const/NOTES_FILE_MANAGER';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { basename } from 'path';
import removeMarkdown from 'remove-markdown';
import { prepareMarkdownContentForNote } from 'utils/prepareMarkdownContentForNote';
import { checkIfItIsNoteRelativeLink } from './checkIfItIsNoteRelativeLink';
import { createMarkdownHeaderText, type HeaderDepth } from './createMarkdownHeaderText';
import { processMarkdownImage } from './processMarkdownImage';

const marked = new Marked({
    gfm: true,
    breaks: true,
    async: true,
});

let slugger = new GithubSlugger();
marked.use({
    hooks: {
        preprocess(src) {
            // https://github.com/markedjs/marked-gfm-heading-id/blob/eeb9d48df948a6a78d1c52095b381868ea5120fb/src/index.js#L58
            slugger = new GithubSlugger();

            return src;
        },
    },
    renderer: {
        heading(input) {
            const {
                raw,
                depth,
                tokens,
            } = input;
            const text = this.parser.parseInline(tokens);

            const id = slugger.slug(removeMarkdown(raw).trim().toLowerCase());

            return createMarkdownHeaderText({
                id,
                depth: depth as HeaderDepth,
                text,
            });
        },
        image: processMarkdownImage,
        link: (params) => {
            const { href, text } = params;

            const isNoteRelativeLink = checkIfItIsNoteRelativeLink(href);

            if (isNoteRelativeLink) {
                const fileName = decodeURIComponent(basename(href));
                const isPublic = NOTES_FILE_MANAGER.isNotePublic(`${fileName}.md`);

                if (isPublic) {
                    return `<a href="${href}">📝 ${text}</a>`;
                } else {
                    return `<span class="MarkdownContainer_noteWithRestrictedAccess">${text}</span>`;
                }
            }

            return `<a href="${href}" target="_blank">${text}</a>`;
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

    return <MarkdownContainer contentHtml={contentHtml} />;
}
