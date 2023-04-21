import Link from "next/link";


export default function Page() {
  return (
    <ul>
      <li>
        Advertisement
        <ul>
          <li>
            <Link href={'/adv/yandex/standard-formats'}>Yandex standard formats</Link>
            <Link href={'/adv/air/standard-formats'}>Air standard formats</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}
