import styles from './index.module.css';

import type { MyselfHtmlFromReadme } from 'utils/getMyselfDataFromReadme';

export function MyselInfoFromReadme({
    myselfHtmlFromReadme,
}: {
    myselfHtmlFromReadme: MyselfHtmlFromReadme;
}) {
    return (
        <div className={styles.markdownContainer}>
            <div dangerouslySetInnerHTML={{ __html: myselfHtmlFromReadme.contentHtml }} />
        </div>
    );
}
