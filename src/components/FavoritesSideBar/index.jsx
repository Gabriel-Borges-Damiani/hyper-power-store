import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./favorites.sidebar.module.css";
import { useFavorites } from "../../context/useFavorites";

export const FavoritesSidebar = ({ isOpen, onClose }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  if (!isOpen) {
    return null;
  }

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(1, Number(value) || 1);

    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleBuy = (product) => {
    const quantity = getQuantity(product.id);

    console.log("INDO PARA:", `/product/${product.id}`);
    console.log("QUANTIDADE:", quantity);

    navigate(`/product/${product.id}`, {
      state: {
        quantity,
      },
    });

    onClose();
  };

  const handleRemove = async (product) => {
    await toggleFavorite(product);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.sidebar}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Meus favoritos</h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar favoritos"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {favorites.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyHeart}>♡</span>

              <h3>Nenhum favorito ainda</h3>

              <p>Clique no coração dos produtos que você deseja salvar.</p>
            </div>
          ) : (
            favorites.map((product) => (
              <div className={styles.favoriteItem} key={product.id}>
                <div className={styles.productMain}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.productImage}
                  />

                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>

                    <span className={styles.price}>
                      R$ {Number(product.price).toFixed(2).replace(".", ",")}
                    </span>

                    {product.brand && (
                      <span className={styles.extraInfo}>{product.brand}</span>
                    )}
                  </div>
                </div>

                <div className={styles.productActions}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          getQuantity(product.id) - 1,
                        )
                      }
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={getQuantity(product.id)}
                      onChange={(event) =>
                        handleQuantityChange(product.id, event.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          getQuantity(product.id) + 1,
                        )
                      }
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.buyButton}
                    onClick={() => {
                      console.log("BOTÃO DO CARRINHO CLICADO");
                      handleBuy(product);
                    }}
                    aria-label={`Comprar ${product.title}`}
                    title="Comprar agora"
                  >
                    🛒
                  </button>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemove(product)}
                    aria-label={`Remover ${product.title} dos favoritos`}
                    title="Remover dos favoritos"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.closeFooterButton}
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </aside>
    </div>
  );
};
