import styles from './index.module.css';

export function MarkdownContainer ({
    contentHtml,
}: {
    contentHtml: string;
}): JSX.Element {
    return (
        <div className={styles.markdownContainer}>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    );
}
