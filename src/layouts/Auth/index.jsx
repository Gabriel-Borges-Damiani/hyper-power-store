import styles from "./auth.module.css";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
