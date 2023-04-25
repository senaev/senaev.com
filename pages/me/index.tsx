import styles from './index.module.css';

import type { MyselfHtmlFromReadme } from 'utils/getMyselfDataFromReadme';
import {
    getMyselfDataFromReadme,
} from 'utils/getMyselfDataFromReadme';

// eslint-disable-next-line no-restricted-exports -- page
export default function Page(props: MyselfHtmlFromReadme) {
    return (
        <div>
            <div className={styles.markdownContainer}>
                <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
            </div>
        </div>
    );
}

export async function getStaticProps(): Promise<{
    props: MyselfHtmlFromReadme;
}> {
    const myselfHtmlFromReadme = await getMyselfDataFromReadme();
    return {
        props: myselfHtmlFromReadme,
    };
}
