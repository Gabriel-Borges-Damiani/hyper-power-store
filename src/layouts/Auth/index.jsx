import styles from "./auth.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.body}>
      <div className={styles.formContainer}>
        <input type="text" className={styles.input} />
      </div>
    </div>
  );
};
