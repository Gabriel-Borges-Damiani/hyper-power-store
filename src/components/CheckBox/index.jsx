import styles from "./check.module.css";

export const CheckBox = ({ label, ...props }) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" {...props} className={styles.checkbox} />
      {label}
    </label>
  );
};
