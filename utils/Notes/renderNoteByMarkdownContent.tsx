

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
        heading({
            raw,
            depth,
            tokens,
        }) {
            const text = this.parser.parseInline(tokens);

            const id = slugger.slug(raw.trim().split(' ').splice(1).join(' ').toLowerCase());

            return `
              <h${depth} id="${id}">
                <a name="${id}" class="MarkdownContainer_anchor" href="#${id}">
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
