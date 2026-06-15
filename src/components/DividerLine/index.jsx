import styles from "./divider.module.css";

export const DividerLine = ({ text }) => {
  return (
    <div className={styles.container}>
      <hr />
      <span>{text}</span>
      <hr />
    </div>
  );
};
