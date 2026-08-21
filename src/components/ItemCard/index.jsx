import { Link } from "react-router-dom";
import Typography from "../Typography";
import styles from "./item.card.module.css";

export const ItemCard = ({ img, id, name, price }) => {
  return (
    <Link
      to={`/product/${id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className={styles.itemCardContainer}>
        <div className={styles.itemCardImgContainer}>
          <div
            className={styles.itemCardImg}
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>

        <div className={styles.itemCardInfo}>
          <Typography variant="body" color="--text-color">
            {name}
          </Typography>

          <div className={styles.priceTag}>
            <Typography variant="bold" color="--price-color">
              ${price}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};
