import styles from "./header.module.css";
import logo from "../../assets/logo-hyper-powerr.png";

import { HearthIcon } from "../HearthIcon/index.jsx";

import { UserIcon } from "../UserIcon/index.jsx";
import { SearchBar } from "../SearchBar/index.jsx";
import { CepIcon } from "../CepIcon/index.jsx";
import { ArrowIcon } from "../ArrowIcon/index.jsx";
import { useFavorites } from "../../context/useFavorites";
import { useCart } from "../../context/CartProvider";
import { useState } from "react";
import { FavoritesSidebar } from "../FavoritesSidebar";
import { CartSidebar } from "../CartSidebar";

import { useNavigate } from "react-router-dom";
import { CartIcon } from "../CartIcon/index.jsx";

import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { favorites } = useFavorites();

  const { cartItems } = useCart();
  const navigate = useNavigate();

  const { user, isAuthenticated, logoutUser, deleteUser } = useAuth();

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
        <button
          type="button"
          className={styles.cartIcon}
          onClick={() => setIsCartOpen(true)}
          aria-label="Abrir carrinho"
        >
          <CartIcon />

          {cartItems.length > 0 && (
            <span className={styles.cartBadge}>{cartItems.length}</span>
          )}
        </button>
        <button
          type="button"
          className={styles.userIcon}
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/auth/login");
              return;
            }

            setIsUserMenuOpen((prev) => !prev);
          }}
          aria-label={
            isAuthenticated ? "Abrir opções da conta" : "Ir para login"
          }
        >
          <UserIcon />
        </button>
        {isAuthenticated && isUserMenuOpen && (
          <div className={styles.userMenu}>
            <div className={styles.userMenuHeader}>
              <span className={styles.userMenuTitle}>Minha conta</span>

              <span className={styles.userMenuEmail}>{user?.email}</span>
            </div>

            <button
              type="button"
              className={styles.logoutButton}
              onClick={() => {
                logoutUser();
                setIsUserMenuOpen(false);
                navigate("/menu");
              }}
            >
              <span>↪</span>
              Sair da conta
            </button>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={async () => {
                const confirmed = window.confirm(
                  "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.",
                );

                if (!confirmed) return;

                await deleteUser();
                setIsUserMenuOpen(false);
                navigate("/menu");
              }}
            >
              <span>🗑</span>
              Excluir conta
            </button>
          </div>
        )}
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
