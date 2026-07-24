import Typography from "../Typography";
import styles from "./products.section.module.css";

export const ProductsSection = ({ text, children }) => {
  return (
    <div className={styles.productsSection}>
      <Typography variant="h3" color="--tertiary-color">
        {text}
      </Typography>

      <div className={styles.productsList}>{children}</div>
    </div>
  );
};
