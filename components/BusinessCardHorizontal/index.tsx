import { BusinessCardAbout } from "components/BusinessCardAbout";
import Image from "next/image";

import styles from "./index.module.css";

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
          height={144}
          width={144}
          alt=""
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
