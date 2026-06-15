import styles from "./auth.container.module.css";

export const AuthContainer = ({ children }) => {
  return <div className={styles.authContainer}>{children}</div>;
};
