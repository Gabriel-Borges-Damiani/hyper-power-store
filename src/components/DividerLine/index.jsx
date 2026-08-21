import styles from "./divider.module.css";

export const DividerLine = ({ children }) => {
  return (
    <div className={styles.container}>
      <hr />
      <span>{children}</span>
      <hr />
    </div>
  );
};
