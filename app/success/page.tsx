import { Button } from "components";
import styles from "./success.module.scss";
import Link from "next/link";

export default function Success() {
  return (
    <div className={styles.block}>
      <p>Success!</p>
      <Link href="/" className={styles.link}>
        <Button>Back to cart</Button>
      </Link>
    </div>
  );
}
