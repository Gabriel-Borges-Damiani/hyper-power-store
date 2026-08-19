import styles from "./products.module.css";
import Typography from "../../components/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../../context/useFavorites";
import { useQuantity } from "../../context/QuantityProvider";
import { useCart } from "../../context/CartProvider";

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const Products = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  const { getQuantity, increaseQuantity, decreaseQuantity } = useQuantity();

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`https://dummyjson.com/products/${id}`);

      const data = await response.json();

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  const specifications = [
    `Produto ${product.title} de alta qualidade.`,
    `Disponibilidade: ${product.stock} unidades em estoque.`,
    `Marca: ${product.brand}`,
    `Categoria: ${product.category}`,
    `Avaliação: ${product.rating}`,
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.productContainer}>
        <div className={styles.gallerySection}>
          <img
            className={styles.mainPhoto}
            src={product.thumbnail}
            alt={`Imagem principal do produto ${product.title}`}
          />

          <div className={styles.thumbnailsGrid}>
            {product.images.slice(0, 3).map((image, index) => (
              <img
                key={image}
                className={styles.thumbPhoto}
                src={image}
                alt={`${product.title} - imagem ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <div className={styles.titleWrapper}>
              <Typography variant="h2" color="--tertiary-color">
                {product.title}
              </Typography>

              <div className={styles.priceSection}>
                <Typography
                  variant="h3"
                  color="--price-color"
                  className={styles.productPrice}
                >
                  {formatPrice(product.price)}
                </Typography>

                <span className={styles.priceDescription}>
                  Preço por unidade
                </span>

                <Typography
                  variant="h3"
                  color="--price-color"
                  className={styles.totalPrice}
                >
                  Total: {formatPrice(product.price * getQuantity(product.id))}
                </Typography>
              </div>
            </div>

            <button
              onClick={() => toggleFavorite(product)}
              className={styles.heartIcon}
              title="Adicionar aos favoritos"
            >
              {isFavorite(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <div className={styles.quantitySection}>
            <span className={styles.quantityLabel}>Quantidade</span>

            <div className={styles.quantityControl}>
              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                aria-label="Diminuir quantidade"
              >
                −
              </button>

              <span>{getQuantity(product.id)}</span>

              <button
                type="button"
                onClick={() => increaseQuantity(product.id)}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.actionsButtons}>
            <button
              className={`${styles.btn} ${styles.btnCart}`}
              onClick={() => addToCart(product)}
            >
              <Typography color="--btn-cart-text" variant="body">
                Adicionar ao carrinho
              </Typography>
            </button>

            <button className={`${styles.btn} ${styles.btnBuy}`}>
              <Typography variant="body">Comprar agora</Typography>
            </button>
          </div>

          <div className={styles.miniDescription}>
            <div className={styles.descriptionItem}>
              <Typography variant="h4" color="--tertiary-color">
                Especificações básicas
              </Typography>
            </div>

            {specifications.map((item, index) => (
              <div className={styles.descriptionItem} key={index}>
                <Typography variant="body" color="--quaternary-color">
                  • {item}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
