import { MarkdownContainer } from 'components/MarkdownContainer';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { basename } from 'path';
import removeMarkdown from 'remove-markdown';
import { prepareMarkdownContentForNote } from 'utils/prepareMarkdownContentForNote';
import { checkIfItIsNoteRelativeLink } from './checkIfItIsNoteRelativeLink';
import { checkNoteExistsOnRemote } from './checkNoteExistsOnRemote';
import { createMarkdownHeaderText, type HeaderDepth } from './createMarkdownHeaderText';
import { processMarkdownImage } from './processMarkdownImage';

// Matches [text](./name) but not image links ![alt](./name)
const RELATIVE_NOTE_LINK_REGEX = /(?<!!)\[[^\]]*\]\(\.\/([^/)]+)\)/g;

function extractRelativeNoteNames(markdown: string): string[] {
    const matches = markdown.matchAll(RELATIVE_NOTE_LINK_REGEX);
    return Array.from(matches, (m) => m[1]).filter((name): name is string => name !== undefined).map(decodeURIComponent);
}

async function buildPublicNotesSet(noteNames: string[]): Promise<Set<string>> {
    const uniqueNames = [...new Set(noteNames)];
    const results = await Promise.all(
        uniqueNames.map(async (name) => {
            const exists = await checkNoteExistsOnRemote(name);
            return exists ? name : null;
        })
    );
    return new Set(results.filter((name): name is string => name !== null));
}

const highlightExtension = markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
});

const obsidianHighlightExtension = {
    extensions: [
        {
            name: 'obsidianHighlight',
            level: 'inline' as const,
            start(src: string) {
                return src.match(/==/)?.index ?? undefined;
            },
            tokenizer(src: string) {
                const rule = /^==([^=]+)==/;
                const match = rule.exec(src);
                if (match) {
                    return {
                        type: 'obsidianHighlight',
                        raw: match[0],
                        text: match[1],
                    };
                }
                return undefined;
            },
            renderer(token: { text: string }) {
                return `<mark class="MarkdownContainer_mark">${token.text}</mark>`;
            },
        },
    ],
};

function createMarkedInstance(publicNotes: Set<string>) {
    let slugger = new GithubSlugger();

    const marked = new Marked({
        gfm: true,
        breaks: true,
        async: true,
    });

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
                    const isPublic = publicNotes.has(fileName);

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

    marked.use(obsidianHighlightExtension);
    marked.use(highlightExtension);

    return marked;
}

export async function renderNoteByMarkdownContent({ markdownContent }: { markdownContent: string }) {
    const preparedMarkdownContent = await prepareMarkdownContentForNote(markdownContent);

    const noteNames = extractRelativeNoteNames(preparedMarkdownContent);
    const publicNotes = await buildPublicNotesSet(noteNames);

    const marked = createMarkedInstance(publicNotes);

    // Use marked to convert markdown into HTML string
    const processedContent = await marked.parse(preparedMarkdownContent);
    const contentHtml = processedContent.toString();

    return <MarkdownContainer contentHtml={contentHtml} />;
}
