import { BusinessCardSticky } from "components/BusinessCardSticky";
import {
  getMyselfDataFromReadme,
  MyselfHtmlFromReadme,
} from "utils/getMyselfDataFromReadme";

import styles from "./index.module.css";

export default function Me(props: MyselfHtmlFromReadme) {
  return (
    <div>
      <BusinessCardSticky/>
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
