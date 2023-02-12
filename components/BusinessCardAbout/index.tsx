import Link from "next/link";

import styles from "./index.module.css";

const SENAEV_EMAIL = "andrei@senaev.com";
const SENAEV_PHONE = "+79826990400";
const SENAEV_SITE_DOMAIN = "senaev.com";
const ME_PAGE_LINK = "/me";

export function BusinessCardAbout() {
  return (
    <div>
      <div>
        <span className={styles.name}>Andrei Senaev</span>
      </div>
      <div>
        <span className={styles.description}>Advert tech developer</span>
      </div>
      <div>
        <span className={styles.phone}>
          Phone: <a href={`tel:${SENAEV_PHONE}`}>+7 (982) 699-04-00</a>
        </span>
      </div>
      <div>
        <span className={styles.email}>
          Email: <a href={`mailto:${SENAEV_EMAIL}`}>{SENAEV_EMAIL}</a>
        </span>
      </div>
      <div>
        <span className={styles.site}>
          About:{" "}
          <Link
            href={ME_PAGE_LINK}
          >{`${SENAEV_SITE_DOMAIN}${ME_PAGE_LINK}`}</Link>
        </span>
      </div>
    </div>
  );
}
