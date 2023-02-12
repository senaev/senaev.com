import styles from "./index.module.css";
import { BusinessCardHorizontal } from "components/BusinessCardHorizontal";

export function HomePage() {
  return (
    <div className={styles.container}>
      <BusinessCardHorizontal stick={false} />
    </div>
  );
}
