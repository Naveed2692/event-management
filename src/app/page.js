
import styles from "./page.module.css";
import Link from "next/link";



export default function Home() {
  return (
    <div className={styles.page}>
     <Link href="/auth/signup">Signup</Link>
    <Link href="./auth/login">Login</Link>
    </div>
  );
};
