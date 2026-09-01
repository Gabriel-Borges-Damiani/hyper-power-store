import { createContext, useEffect, useState } from "react";

import { addFavorite, removeFavorite, getFavorites } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      const authUser = localStorage.getItem("auth_user");

      if (!authUser) {
        setFavorites([]);
        return;
      }

      try {
        const user = JSON.parse(authUser);

        const data = await getFavorites(user.id);

        setFavorites(data);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        setFavorites([]);
      }
    };

    loadFavorites();

    const handleAuthChange = () => {
      loadFavorites();
    };

    window.addEventListener("auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);
  const toggleFavorite = async (product) => {
    const authUser = localStorage.getItem("auth_user");

    if (!authUser) {
      navigate("/auth/login");
      return;
    }

    const user = JSON.parse(authUser);

    const exists = favorites.some((item) => item.id === product.id);

    if (exists) {
      const updated = await removeFavorite(user.id, product.id);

      setFavorites(updated);
    } else {
      const updated = await addFavorite(user.id, product);

      setFavorites(updated);
    }
  };

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
