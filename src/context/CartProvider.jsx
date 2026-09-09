import { createContext, useContext, useEffect, useState } from "react";

import {
  getCart,
  addToCart as addToCartDB,
  removeFromCart as removeFromCartDB,
} from "../api/userApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const getLoggedUser = () => {
    const authUser = localStorage.getItem("auth_user");

    if (!authUser) {
      return null;
    }

    try {
      return JSON.parse(authUser);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      const user = getLoggedUser();

      if (!user) {
        setCartItems([]);
        return;
      }

      try {
        const cart = await getCart(user.id);
        setCartItems(cart);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        setCartItems([]);
      }
    };

    loadCart();

    const handleAuthChange = () => {
      loadCart();
    };

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  const addToCart = async (product) => {
    const user = getLoggedUser();

    if (!user) {
      return false;
    }

    try {
      const updatedCart = await addToCartDB(user.id, product);

      setCartItems(updatedCart);

      return true;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);

      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const user = getLoggedUser();

    if (!user) {
      return false;
    }

    try {
      const updatedCart = await removeFromCartDB(user.id, productId);

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
