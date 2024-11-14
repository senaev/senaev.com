

import { MarkdownContainer } from 'components/MarkdownContainer';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import isNumber from 'is-number';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { basename, dirname } from 'path';
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
        heading(input) {
            const {
                raw,
                depth,
                tokens,
            } = input;
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
        image(input) {
            const { href, text } = input;

            let src = href;
            let width: string | undefined;
            let height: string | undefined;

            const isNoteRelativeLink = dirname(href) === '.';
            if (isNoteRelativeLink) {
                const description = text.trim();
                const filename = decodeURIComponent(basename(href));
                src = `/notes_file/${filename}`;

                // Something is set as a title or size
                // supports descriptions like:
                // - 300 (width)
                // - 300x150 (width x heigth)
                // - 100% (width 100%)
                if (description && filename !== description) {
                    if (description.endsWith('%')){
                        const rawWidthInPercent = description.split('%')[0];

                        if (isNumber(rawWidthInPercent)) {
                            width = description;
                        }
                    } else if (isNumber(description)) {
                        width = description;
                    } else {
                        const [w, h] = description.split('x');

                        if (isNumber(w) && isNumber(h)) {
                            width = w;
                            height = h;
                        }
                    }
                }
            }

            const attributes = Object
                .entries({
                    src,
                    width,
                    height,
                })
                .filter(([, value]) => Boolean(value));

            const attributesString = attributes.map(([key, value]) => `${key}="${value}"`).join(' ');

            return `<img ${attributesString}>`;
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
