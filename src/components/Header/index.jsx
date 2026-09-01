import styles from "./header.module.css";
import logo from "../../assets/logo-hyper-powerr.png";

import { HearthIcon } from "../HearthIcon/index.jsx";

import { UserIcon } from "../UserIcon/index.jsx";
import { SearchBar } from "../SearchBar/index.jsx";
import { CepIcon } from "../CepIcon/index.jsx";
import { ArrowIcon } from "../ArrowIcon/index.jsx";
import { useFavorites } from "../../context/useFavorites";
import { useCart } from "../../context/CartProvider";
import { useState, useEffect, useRef } from "react";
import { FavoritesSidebar } from "../FavoritesSidebar";
import { CartSidebar } from "../CartSidebar";

import { getAddressByCep } from "../../api-external/cepApi";

import { useNavigate } from "react-router-dom";
import { CartIcon } from "../CartIcon/index.jsx";

import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { favorites, clearFavorites } = useFavorites();

  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const { user, isAuthenticated, logoutUser, deleteUser } = useAuth();

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCepOpen, setIsCepOpen] = useState(false);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  const cepRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cepRef.current && !cepRef.current.contains(event.target)) {
        setIsCepOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);

    if (numbers.length <= 5) {
      return numbers;
    }

    return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
  };

  const handleCepChange = (event) => {
    const formattedCep = formatCep(event.target.value);

    setCep(formattedCep);
    setAddress(null);
    setCepError("");
  };

  const handleSearchCep = async () => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setCepError("Digite um CEP válido.");
      return;
    }

    try {
      setLoadingCep(true);
      setCepError("");

      const data = await getAddressByCep(cep);

      setAddress(data);
    } catch (error) {
      setAddress(null);
      setCepError(error.message);
    } finally {
      setLoadingCep(false);
    }
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.logoButton}
        onClick={() => navigate("/menu")}
        aria-label="Ir para o menu"
      >
        <img className={styles.topLogo} src={logo} alt="Blue Control logo" />
      </button>
      <div className={styles.topIcons} ref={userMenuRef}>
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

                clearFavorites();
                clearCart();

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
      <div className={styles.bottom} ref={cepRef}>
        <button
          type="button"
          className={styles.cepTrigger}
          onClick={() => setIsCepOpen((prev) => !prev)}
        >
          <CepIcon />

          <span className={styles.cepButton}>
            {address
              ? `${address.localidade} - ${address.uf}`
              : "Digite seu CEP"}
          </span>

          <ArrowIcon />
        </button>

        {isCepOpen && (
          <div className={styles.cepPopup}>
            <div className={styles.cepPopupHeader}>
              <div>
                <strong>Calcule seu frete</strong>

                <span>Informe seu CEP para consultar sua região.</span>
              </div>

              <button
                type="button"
                className={styles.closeCepButton}
                onClick={() => setIsCepOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.cepInputGroup}>
              <label htmlFor="header-cep">CEP</label>

              <div className={styles.cepInputRow}>
                <input
                  id="header-cep"
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  maxLength={9}
                />

                <button
                  type="button"
                  onClick={handleSearchCep}
                  disabled={loadingCep}
                >
                  {loadingCep ? "..." : "Calcular"}
                </button>
              </div>

              {cepError && <span className={styles.cepError}>{cepError}</span>}
            </div>

            {address && (
              <div className={styles.cepResult}>
                <div className={styles.cepResultIcon}>📍</div>

                <div>
                  <strong>{address.logradouro || "Região encontrada"}</strong>

                  <span>{address.bairro}</span>

                  <span>
                    {address.localidade} - {address.uf}
                  </span>
                </div>
              </div>
            )}

            {address && (
              <div className={styles.shippingResult}>
                <span>Frete para sua região</span>

                <strong>
                  {cartItems.reduce(
                    (total, item) =>
                      total + Number(item.product.price) * item.quantity,
                    0,
                  ) >= 200
                    ? "GRÁTIS"
                    : "R$ 19,90"}
                </strong>

                <small>Frete grátis em compras acima de R$ 200.</small>
              </div>
            )}
          </div>
        )}
      </div>
      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
