import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./checkout.module.css";

import { getAddressByCep } from "../../api-external/cepApi";

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const formatCep = (value) => {
  const numbers = value.replace(/\D/g, "").slice(0, 8);

  if (numbers.length <= 5) {
    return numbers;
  }

  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
};

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = location.state?.items || [];

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [finished, setFinished] = useState(false);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  }, [items]);

  const shipping = useMemo(() => {
    if (!address) {
      return 0;
    }

    if (subtotal >= 200) {
      return 0;
    }

    return 19.9;
  }, [address, subtotal]);

  const [checkoutItems, setCheckoutItems] = useState(items);

  useEffect(() => {
    setCheckoutItems(items);
  }, [location.state]);

  const increaseQuantity = (productId) => {
    setCheckoutItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCheckoutItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const handleCepChange = (event) => {
    const formattedCep = formatCep(event.target.value);

    setCep(formattedCep);
    setAddress(null);
    setCepError("");
  };

  const handleSearchCep = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
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

  const handleFinishPurchase = () => {
    if (!address) {
      alert("Informe o CEP antes de finalizar a compra.");
      return;
    }

    if (!paymentMethod) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    setFinished(true);
  };

  const checkoutSubtotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  }, [checkoutItems]);

  const checkoutShipping = useMemo(() => {
    if (!address) {
      return 0;
    }

    if (checkoutSubtotal >= 200) {
      return 0;
    }

    return 19.9;
  }, [address, checkoutSubtotal]);

  const checkoutTotal = checkoutSubtotal + checkoutShipping;

  if (checkoutItems.length === 0) {
    return (
      <main className={styles.emptyPage}>
        <div className={styles.emptyCard}>
          <h2>Nenhum produto selecionado</h2>

          <p>Não encontramos produtos para finalizar esta compra.</p>

          <button type="button" onClick={() => navigate("/menu")}>
            Voltar para o menu
          </button>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>

          <h1>Compra finalizada!</h1>

          <p>Essa é apenas uma simulação. Nenhum pagamento foi realizado.</p>

          <strong>{formatPrice(checkoutTotal)}</strong>

          <button type="button" onClick={() => navigate("/menu")}>
            Voltar para o menu
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleArea}>
          <span>FINALIZAÇÃO</span>

          <h1>Finalizar compra</h1>

          <p>Confira os produtos, endereço e pagamento antes de continuar.</p>
        </div>

        <div className={styles.layout}>
          <section className={styles.leftColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Seus produtos</h2>

                <p>
                  {checkoutItems.length} produto
                  {checkoutItems.length > 1 ? "s" : ""} no pedido
                </p>
              </div>

              <div className={styles.productsList}>
                {checkoutItems.map((item) => {
                  const product = item.product;
                  const quantity = item.quantity;

                  const itemTotal = Number(product.price) * quantity;

                  return (
                    <div className={styles.product} key={product.id}>
                      <div className={styles.imageWrapper}>
                        <img src={product.thumbnail} alt={product.title} />
                      </div>

                      <div className={styles.productInfo}>
                        <h3>{product.title}</h3>

                        {product.brand && <span>{product.brand}</span>}

                        <strong>{formatPrice(product.price)}</strong>

                        <small>Preço por unidade</small>
                      </div>

                      <div className={styles.productQuantity}>
                        <span>Quantidade</span>

                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(product.id)}
                          >
                            −
                          </button>

                          <strong>{quantity}</strong>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(product.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className={styles.productItemTotal}>
                        <span>Total: </span>

                        <strong>{formatPrice(itemTotal)}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Endereço de entrega</h2>

                <p>Informe seu CEP para calcular o frete.</p>
              </div>

              <div className={styles.cepForm}>
                <label htmlFor="cep">CEP</label>

                <div className={styles.cepRow}>
                  <input
                    id="cep"
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
                    {loadingCep ? "Consultando..." : "Calcular frete"}
                  </button>
                </div>

                {cepError && <span className={styles.error}>{cepError}</span>}
              </div>

              {address && (
                <div className={styles.address}>
                  <strong>{address.logradouro}</strong>

                  <span>{address.bairro}</span>

                  <span>
                    {address.localidade} - {address.uf}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Forma de pagamento</h2>

                <p>Escolha como deseja pagar sua compra.</p>
              </div>

              <div className={styles.paymentOptions}>
                <label
                  className={
                    paymentMethod === "pix"
                      ? styles.paymentOptionActive
                      : styles.paymentOption
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <strong>PIX</strong>
                    <span>Pagamento instantâneo</span>
                  </div>

                  <span className={styles.paymentIcon}>PIX</span>
                </label>

                <label
                  className={
                    paymentMethod === "card"
                      ? styles.paymentOptionActive
                      : styles.paymentOption
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <strong>Cartão</strong>
                    <span>Crédito ou débito</span>
                  </div>

                  <span className={styles.paymentIcon}>💳</span>
                </label>

                <label
                  className={
                    paymentMethod === "boleto"
                      ? styles.paymentOptionActive
                      : styles.paymentOption
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="boleto"
                    checked={paymentMethod === "boleto"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <strong>Boleto</strong>
                    <span>Pagamento por boleto</span>
                  </div>

                  <span className={styles.paymentIcon}>▤</span>
                </label>
              </div>
            </div>
          </section>

          <aside className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>Resumo do pedido</h2>
            </div>

            <div className={styles.summaryLines}>
              <div>
                <span>Produtos</span>

                <strong>{formatPrice(checkoutSubtotal)}</strong>
              </div>

              <div>
                <span>Frete</span>

                <strong>
                  {!address
                    ? "Informe o CEP"
                    : checkoutShipping === 0
                      ? "Grátis"
                      : formatPrice(checkoutShipping)}
                </strong>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>

              <strong>{formatPrice(checkoutTotal)}</strong>
            </div>

            <button
              type="button"
              className={styles.finishButton}
              onClick={handleFinishPurchase}
            >
              Finalizar compra
            </button>

            <p className={styles.disclaimer}>
              Compra demonstrativa. Nenhum pagamento será processado.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};
