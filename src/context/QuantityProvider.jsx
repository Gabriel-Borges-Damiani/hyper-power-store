import { createContext, useContext, useState } from "react";

const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const setQuantity = (productId, quantity) => {
    const newQuantity = Math.max(1, Number(quantity) || 1);

    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  return (
    <QuantityContext.Provider
      value={{
        quantities,
        getQuantity,
        setQuantity,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => {
  return useContext(QuantityContext);
};
