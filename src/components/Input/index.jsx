import styles from "./input.module.css";

export const Input = ({ type, ...rest }) => {
  return <input className={styles.input} type={type} {...rest} />;
};
