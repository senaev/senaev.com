import styles from './index.module.css';

import type { MyselfHtmlFromReadme } from 'utils/getMyselfDataFromReadme';
import {
    getMyselfDataFromReadme,
} from 'utils/getMyselfDataFromReadme';

export default async function Page() {
    const myselfHtmlFromReadme: MyselfHtmlFromReadme = await getMyselfDataFromReadme();

    return (
        <div>
            <div className={styles.markdownContainer}>
                <div dangerouslySetInnerHTML={{ __html: myselfHtmlFromReadme.contentHtml }} />
            </div>
        </div>
    );
}
