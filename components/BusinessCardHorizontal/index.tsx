import { BusinessCardAbout } from "components/BusinessCardAbout";
import { SENAEV_FULL_NAME } from "const/const";
import Image from "next/image";
import clsx from "clsx";

import styles from "./index.module.css";

const PHOTO_SIZE_BIG = 144;

export function BusinessCardHorizontal() {
  return (
    <div
      className={clsx(styles.container)}
    >
      <div className={styles.leftSide}>
        <Image
          priority
          src="/img/avatar-head.jpg"
          className={styles.avatarImage}
          height={PHOTO_SIZE_BIG}
          width={PHOTO_SIZE_BIG}
          alt={SENAEV_FULL_NAME}
        />
      </div>
      <div className={styles.centralSeparator}>
        <div className={styles.centralSeparator_line} />
      </div>
      <div className={styles.rightSide}>
      <BusinessCardAbout />
      </div>
    </div>
  );
}
