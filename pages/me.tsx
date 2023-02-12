import { BusinessCardHorizontal } from "components/BusinessCardHorizontal";
import {
  getMyselfDataFromReadme,
  MyselfHtmlFromReadme,
} from "utils/getMyselfDataFromReadme";

export default function Me(props: MyselfHtmlFromReadme) {
  return (
    <div>
      <BusinessCardHorizontal stick={true} />
      <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
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
