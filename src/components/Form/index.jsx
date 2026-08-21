import styles from "./form.module.css";

export const Form = ({ handleOnSubmit, handleSubmit, children, ...props }) => {
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className={styles.form}
      {...props}
    >
      {children}
    </form>
  );
};
