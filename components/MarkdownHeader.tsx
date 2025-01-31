import { createMarkdownHeaderText } from 'utils/Notes/createMarkdownHeaderText';

export function MarkdownHeader(params: Parameters<typeof createMarkdownHeaderText>[0]) {
    return <div
        dangerouslySetInnerHTML={{
            __html: createMarkdownHeaderText(params),
        }}
    />;
}
