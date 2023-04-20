import {
  ME_PAGE_LINK,
  SENAEV_EMAIL,
  SENAEV_PHONE,
  SENAEV_SITE_DOMAIN,
} from "const/const";
import Link from "next/link";

import styles from "./index.module.css";

export function BusinessCardAbout() {
  return (
    <div>
      <div>
        <span className={styles.name}>Andrei Senaev</span>
      </div>
      <div>
        <span>Advert tech developer</span>
      </div>
      <div>
        <span>
          Phone:{" "}
          <a target={"_blank"} rel={"noreferrer"} href={`tel:${SENAEV_PHONE}`}>
            +7 (982) 699-04-00
          </a>
        </span>
      </div>
      <div>
        <span>
          Email:{" "}
          <a
            target={"_blank"}
            rel={"noreferrer"}
            href={`mailto:${SENAEV_EMAIL}`}
          >
            {SENAEV_EMAIL}
          </a>
        </span>
      </div>
      <div>
        <span>
          Telegram:{" "}
          <a target={"_blank"} rel={"noreferrer"} href={`https://senaev.t.me`}>
            @senaev
          </a>
        </span>
      </div>
      <div>
        <span>
          Site:{" "}
          <Link
            href={ME_PAGE_LINK}
          >{`${SENAEV_SITE_DOMAIN}${ME_PAGE_LINK}`}</Link>
        </span>
      </div>
    </div>
  );
}