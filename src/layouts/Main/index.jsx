import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Outlet } from "react-router-dom";

import styles from "./main.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};
