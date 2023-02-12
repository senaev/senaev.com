import { BusinessCardAbout } from "components/BusinessCardAbout";
import { SENAEV_FULL_NAME } from "const/const";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";

const PHOTO_SIZE_BIG = 144;
const PHOTO_SIZE_STICKY = 48;

export function BusinessCardHorizontal({ stick }: { stick: boolean }) {
  return (
    <div
      className={`${styles.container} ${stick ? styles.container_stick : ""}`}
    >
      <div className={styles.leftSide}>
        <Image
          priority
          src="/img/avatar-head.jpg"
          className={styles.avatarImage}
          height={stick ? PHOTO_SIZE_STICKY : PHOTO_SIZE_BIG}
          width={stick ? PHOTO_SIZE_STICKY : PHOTO_SIZE_BIG}
          alt={SENAEV_FULL_NAME}
        />
      </div>
      <div className={styles.centralSeparator}>
        <div className={styles.centralSeparator_line} />
      </div>
      <div className={styles.rightSide}>
        {stick ? (
          <div>
            <Link href="/">Home</Link>
          </div>
        ) : (
          <BusinessCardAbout />
        )}
      </div>
    </div>
  );
}
