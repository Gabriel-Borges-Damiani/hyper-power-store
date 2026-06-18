import styles from "./input.module.css";

export const Input = ({ type, register, registerName, ...rest }) => {
  return (
    <input
      className={styles.inputForm}
      {...register(registerName)}
      type={type}
      {...rest}
    />
  );
};
