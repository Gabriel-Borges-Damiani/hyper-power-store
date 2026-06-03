import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import styles from "./main.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
};
