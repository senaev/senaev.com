import Link from "next/link";


export default function Page() {
  return (
    <ul>
      <li>
        Advertisement
        <ul>
          <li> 
            <Link href={'/adv/yandex/standard-formats'}>Yandex standard formats</Link>
          </li>
          <li> 
            <Link href={'/adv/air/standard-formats'}>Air standard formats</Link>
          </li>
          <li> 
            <Link href={'/adv/google/standard-formats'}>Google standard formats</Link>
          </li>
        </ul>
      </li>
      <li>
        Administration
        <ul>
          <li> 
            <Link href={'https://analytics.google.com/analytics/web/#/p371912726/reports/intelligenthome'}>Google Analytics</Link>
          </li>
          <li> 
            <Link href={'https://metrika.yandex.ru/dashboard?group=day&period=week&id=93313002'}>Yandex Metrika</Link>
          </li>
          <li> 
            <Link href={'https://partner.yandex.ru/v2/web/campaigns/2349763/'}>Yandex Advertising Network</Link>
          </li>
          <li> 
            <Link href={'https://www.google.com/adsense/new/u/0/pub-5756750483186348/sites/detail/url=senaev.com'}>Google AdSense</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}
