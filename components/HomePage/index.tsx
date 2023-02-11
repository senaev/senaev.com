import styles from "./index.module.css";
import { name } from "const/const";
import Image from "next/image";

export function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          priority
          src="/img/avatar-head.jpg"
          className={styles.borderCircle}
          height={144}
          width={144}
          alt=""
        />
        <h1 className={styles.heading2Xl}>{name}</h1>
      </header>
      <main>
        <section className={styles.headingMd}>
          <p>Ambitious, enthusiastic, a fan of my job.</p>
          <p>
            I am driven by the desire for constant professional and personal
            growth.
          </p>
          <p>
            My goal is to make a significant contribution to the IT industry.
          </p>
          <p>
            Specialist at the intersection of multimedia and advertising
            technologies.
          </p>
        </section>
      </main>
    </div>
  );
}
