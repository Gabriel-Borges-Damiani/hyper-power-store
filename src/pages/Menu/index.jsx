import styles from "./menu.module.css";
import { CategoryCircle } from "../../components/CategoryCircle";
import smartphoneImg from "./smartphone-category.png";
import tabletImg from "./tablet-category.png";
import laptopImg from "./laptop-category.png";
import accessoriesImg from "./accessories-category.png";
import { useNavigate } from "react-router-dom";
import { ProductsSection } from "../../components/ProductsSection";
import { ItemCard } from "../../components/ItemCard";
import { getRandomProductsByCategory } from "../../api-external/products";
import { useEffect, useState } from "react";

const categories = ["smartphones", "tablets", "laptops", "mobile-accessories"];
const categoryNames = {
  smartphones: "Smartphones",
  tablets: "Tablets",
  laptops: "Laptops",
  "mobile-accessories": "Acessórios de Celular",
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const Menu = () => {
  const navigate = useNavigate();

  const [productsSections, setProductsSections] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const sections = await Promise.all(
        categories.map(async (category) => {
          const products = await getRandomProductsByCategory(category);

          return {
            category,
            products,
          };
        }),
      );

      setProductsSections(sections);
    }

    loadProducts();
  }, []);

  return (
    <>
      <section className={styles.hero}></section>
      <div className={styles.favoritesSection}>
        <CategoryCircle
          src={smartphoneImg}
          alt="Smartphone moderno em destaque sobre fundo escuro com ícones luminosos de câmera, 5G, inteligência artificial e bateria ao redor."
          text="Smartphones"
          onClick={() => navigate("/category/smartphones")}
        ></CategoryCircle>
        <CategoryCircle
          src={tabletImg}
          alt="Três tablets modernos exibidos em um ambiente escuro com iluminação azul. Um tablet em primeiro plano está conectado a teclado e caneta digital, enquanto outros dois aparecem ao fundo, destacando produtividade, mobilidade e design premium."
          text="Tablets"
          onClick={() => navigate("/category/tablets")}
        ></CategoryCircle>
        <CategoryCircle
          src={laptopImg}
          alt="Conjunto de três laptops ultrafinos posicionados sobre uma superfície escura com iluminação elegante. As telas exibem gráficos abstratos coloridos, enquanto ícones destacam desempenho, bateria de longa duração, segurança avançada e alta resolução."
          text="Laptops"
          onClick={() => navigate("/category/laptops")}
        ></CategoryCircle>
        <CategoryCircle
          src={accessoriesImg}
          alt="Vários acessórios para smartphone organizados em uma vitrine tecnológica, incluindo capa protetora, carregador sem fio, suporte veicular, fones de ouvido sem fio, headphone, carregador de tomada, power bank e cabos USB, representando praticidade, conectividade e proteção para o dia a dia."
          text="Acessórios"
          onClick={() => navigate("/category/mobile-accessories")}
        ></CategoryCircle>
      </div>
      {productsSections.map((p) => {
        return (
          <ProductsSection key={p.category} text={categoryNames[p.category]}>
            {p.products.map((product) => (
              <ItemCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={formatPrice(product.price)}
                img={product.thumbnail}
              />
            ))}
          </ProductsSection>
        );
      })}
    </>
  );
};
