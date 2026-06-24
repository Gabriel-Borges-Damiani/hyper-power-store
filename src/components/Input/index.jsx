import styles from "./input.module.css";

export const Input = ({ error, type, register, registerName, ...rest }) => {
  return (
    <>
      <input
        className={`${styles.inputForm} ${error ? styles.error : ""}`}
        {...register(registerName)}
        type={type}
        {...rest}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </>
  );
};
