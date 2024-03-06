import { HomePage } from 'components/HomePage'
import { getMyselfDataFromReadme, type MyselfHtmlFromReadme } from 'utils/getMyselfDataFromReadme'

export default async function Page (): Promise<JSX.Element> {
  const myselfHtmlFromReadme: MyselfHtmlFromReadme = await getMyselfDataFromReadme()

  return (
        <>
            <HomePage myselfHtmlFromReadme={myselfHtmlFromReadme} />
        </>
  )
}
