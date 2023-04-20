import { BusinessCardHorizontal } from "components/BusinessCardHorizontal";
import Link from "next/link";

export function HomePage() {
  return <>
    <Link href={'/more'}>more</Link>
    <BusinessCardHorizontal />
  </>;
}
