import { createContext, useEffect, useState } from "react";

import { addFavorite, removeFavorite, getFavorites } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth_user"));

  async function loadFavorites() {
    const data = await getFavorites(user.id);

    setFavorites(data);
  }

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, []);

  async function toggleFavorite(product) {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const exists = favorites.some((item) => item.id === product.id);

    if (exists) {
      const updated = await removeFavorite(user.id, product.id);

      setFavorites(updated);
    } else {
      const updated = await addFavorite(user.id, product);

      setFavorites(updated);
    }
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
