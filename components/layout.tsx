import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import pageStyles from "../src/app/page.module.css";
import Link from "next/link";
import { siteTitle, name } from "const/const";

export function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: true;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/img/avatar-head.jpg"
              className={pageStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={pageStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/img/avatar-head.jpg"
                className={pageStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={pageStyles.headingLg}>
              <Link href="/" className={pageStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
