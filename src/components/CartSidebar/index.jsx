import { useNavigate } from "react-router-dom";
import styles from "./cart.sidebar.module.css";

import { useCart } from "../../context/CartProvider";
import { useQuantity } from "../../context/QuantityProvider";

export const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  const { getQuantity, increaseQuantity, decreaseQuantity } = useQuantity();

  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const getItemTotal = (product) => {
    return product.price * getQuantity(product.id);
  };

  const totalCart = cartItems.reduce((total, product) => {
    return total + getItemTotal(product);
  }, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleBuyOne = (product) => {
    const user = localStorage.getItem("auth_user");

    if (!user) {
      onClose();
      navigate("/auth/login");
      return;
    }
    navigate("/checkout", {
      state: {
        items: [
          {
            product,
            quantity: getQuantity(product.id),
          },
        ],
      },
    });

    onClose();
  };

  const handleBuyAll = () => {
    const user = localStorage.getItem("auth_user");

    if (!user) {
      onClose();
      navigate("/auth/login");
      return;
    }
    const items = cartItems.map((product) => ({
      product,
      quantity: getQuantity(product.id),
    }));

    navigate("/checkout", {
      state: {
        items,
      },
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.sidebar}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Seu carrinho</h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <span>🛒</span>

              <h3>Seu carrinho está vazio</h3>

              <p>Adicione produtos para começar sua compra.</p>
            </div>
          ) : (
            cartItems.map((product) => (
              <div className={styles.cartItem} key={product.id}>
                <div className={styles.productMain}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.productImage}
                  />

                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>

                    <span className={styles.unitPrice}>
                      {formatPrice(product.price)} por unidade
                    </span>

                    <span className={styles.itemTotal}>
                      Total: {formatPrice(getItemTotal(product))}
                    </span>
                  </div>
                </div>

                <div className={styles.productActions}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      −
                    </button>

                    <span>{getQuantity(product.id)}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.buyButton}
                    onClick={() => handleBuyOne(product)}
                  >
                    Comprar
                  </button>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeFromCart(product.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total:</span>

              <strong>{formatPrice(totalCart)}</strong>
            </div>

            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleBuyAll}
            >
              Finalizar compra
            </button>

            <button
              type="button"
              className={styles.closeFooterButton}
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
