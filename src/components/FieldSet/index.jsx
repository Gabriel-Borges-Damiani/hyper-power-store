import styles from "./field.set.module.css";

export const FieldSet = ({ children, legend }) => {
  return (
    <fieldset className={styles.fieldSet}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};
