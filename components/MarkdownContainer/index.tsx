import './MarkdownContainer.css';

export function MarkdownContainer ({
    contentHtml,
}: {
    contentHtml: string;
}): JSX.Element {
    return (
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    );
}
