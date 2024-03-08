import { MyselInfoFromReadme } from 'components/MyselInfoFromReadme';
import type { MyselfHtmlFromReadme } from 'utils/getMyselfDataFromReadme';

export function HomePage ({
    myselfHtmlFromReadme,
}: {
  myselfHtmlFromReadme: MyselfHtmlFromReadme
}): JSX.Element {
    return (
        <>
            <MyselInfoFromReadme myselfHtmlFromReadme={myselfHtmlFromReadme} />
        </>
    );
}
