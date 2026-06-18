import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

export const Form = ({ children, ...props }) => {
  const { registerUser } = useAuth();

  const { handleSubmit } = useForm();

  const handleOnSubmit = (data) => {
    registerUser(data);
  };

  return (
    <form
      onSubmit={handleOnSubmit(handleSubmit)}
      className={styles.form}
      {...props}
    >
      {children}
    </form>
  );
};
