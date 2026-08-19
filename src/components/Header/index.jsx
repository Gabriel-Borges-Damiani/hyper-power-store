import styles from "./header.module.css";
import logo from "../../assets/logo-hyper-powerr.png";

import { HearthIcon } from "../HearthIcon/index.jsx";
import { CarIcon } from "../CarIcon/index.jsx";
import { UserIcon } from "../UserIcon/index.jsx";
import { SearchBar } from "../SearchBar/index.jsx";
import { CepIcon } from "../CepIcon/index.jsx";
import { ArrowIcon } from "../ArrowIcon/index.jsx";
import { useFavorites } from "../../context/useFavorites";
import { useState } from "react";
import { FavoritesSidebar } from "../FavoritesSidebar";
import { CartSidebar } from "../CartSidebar";

import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { favorites } = useFavorites();

  const navigate = useNavigate();

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <header className={styles.header}>
      <button
        className={styles.logoButton}
        onClick={() => navigate("/menu")}
        aria-label="Ir para o menu"
      >
        <img className={styles.topLogo} src={logo} alt="Blue Control logo" />
      </button>
      <div className={styles.topIcons}>
        <button
          className={styles.favoriteIcon}
          onClick={() => setIsFavoritesOpen(true)}
          aria-label="Abrir favoritos"
        >
          <HearthIcon />

          {favorites.length > 0 && (
            <span className={styles.favoriteBadge}>{favorites.length}</span>
          )}
        </button>
        <div
          className={styles.cartIcon}
          onClick={() => setIsCartOpen(true)}
          role="button"
          tabIndex={0}
        >
          <CarIcon />
        </div>
        <UserIcon></UserIcon>
      </div>
      <div className={styles.middle}>
        <SearchBar></SearchBar>
      </div>
      <div className={styles.bottom}>
        <CepIcon></CepIcon>
        <button className={styles.cepButton}>Digite seu CEP</button>
        <ArrowIcon></ArrowIcon>
      </div>
      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
