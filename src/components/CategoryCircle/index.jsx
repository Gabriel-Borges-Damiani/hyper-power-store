import Typography from "../Typography";
import styles from "./category.circle.module.css";

export const CategoryCircle = ({ text, onClick, ...props }) => {
  return (
    <a onClick={onClick}>
      <div className={styles.categoryItem}>
        <div className={styles.circleWrapper}>
          <img {...props} />
        </div>
        <Typography variant="h3" color="--tertiary-color">
          {text}
        </Typography>
      </div>
    </a>
  );
};
