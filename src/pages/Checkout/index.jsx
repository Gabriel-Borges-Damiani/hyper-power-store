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

  const product = location.state?.product;
  const initialQuantity = location.state?.quantity || 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const subtotal = useMemo(() => {
    if (!product) return 0;

    return Number(product.price) * quantity;
  }, [product, quantity]);

  const shipping = useMemo(() => {
    if (!address) {
      return 0;
    }

    if (subtotal >= 200) {
      return 0;
    }

    return 19.9;
  }, [address, subtotal]);

  const total = subtotal + shipping;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleCepChange = (event) => {
    const formattedCep = formatCep(event.target.value);

    setCep(formattedCep);

    setAddress(null);
    setCepError("");
  };

  const handleSearchCep = async () => {
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
    if (!paymentMethod) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    setFinished(true);
  };

  if (!product) {
    return (
      <main className={styles.emptyPage}>
        <div className={styles.emptyCard}>
          <h2>Nenhum produto selecionado</h2>

          <p>Não encontramos um produto para finalizar a compra.</p>

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

          <strong>{formatPrice(total)}</strong>

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

          <p>Confira os detalhes do seu pedido antes de continuar.</p>
        </div>

        <div className={styles.layout}>
          <section className={styles.leftColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Seu produto</h2>
              </div>

              <div className={styles.product}>
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
                    <button type="button" onClick={decreaseQuantity}>
                      −
                    </button>

                    <strong>{quantity}</strong>

                    <button type="button" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Endereço de entrega</h2>

                  <p>Informe seu CEP para calcular o frete.</p>
                </div>
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

          {/* RESUMO */}

          <aside className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>Resumo do pedido</h2>
            </div>

            <div className={styles.summaryProduct}>
              <img src={product.thumbnail} alt={product.title} />

              <div>
                <strong>{product.title}</strong>

                <span>
                  {quantity} unidade
                  {quantity > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className={styles.summaryLines}>
              <div>
                <span>Produto</span>

                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div>
                <span>Frete</span>

                <strong>
                  {!address
                    ? "Informe o CEP"
                    : shipping === 0
                      ? "Grátis"
                      : formatPrice(shipping)}
                </strong>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>

              <strong>{formatPrice(total)}</strong>
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
