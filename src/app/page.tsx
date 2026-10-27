import Link from "next/link";
import { Wordmark } from "@design-system";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <Wordmark size={40} />
        <h1 className={styles.headline}>
          Imóveis sob controle. Decisões mais <span className={styles.accent}>claras.</span>
        </h1>
        <p className={styles.lead}>Base do projeto pronta: toda tela nova nasce do design system.</p>
        <nav className={styles.links}>
          <Link className={styles.link} href="/design-system">
            Design system
          </Link>
          <Link className={styles.link} href="/design-system/admin">
            Template do painel
          </Link>
        </nav>
      </div>
    </main>
  );
}
