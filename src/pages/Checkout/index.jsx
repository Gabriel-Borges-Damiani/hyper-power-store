import { useLocation } from "react-router-dom";

export const Checkout = () => {
  const location = useLocation();

  const items = location.state?.items || [];

  return (
    <div>
      <h1>Finalizar compra</h1>

      {items.map(({ product, quantity }) => (
        <div key={product.id}>
          <h2>{product.title}</h2>

          <p>Quantidade: {quantity}</p>

          <p>Subtotal: {product.price * quantity}</p>
        </div>
      ))}
    </div>
  );
};
