import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductByCategory } from "../../api-external/products";
import { useState } from "react";

import { ProductsSection } from "../../components/ProductsSection";
import { ItemCard } from "../../components/ItemCard";
import Typography from "../../components/Typography";

import styles from "./category.page.module.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const categoryNames = {
  smartphones: "Smartphones",
  tablets: "Tablets",
  laptops: "Laptops",
  "mobile-accessories": "Acessórios de Celular",
};

export const CategoryPage = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function findProducts() {
      setProducts(await getProductByCategory(pathname.split("/").pop()));
    }
    findProducts();
  }, [pathname]);

  const productsPerSection = 4;

  const sections = [];

  for (let i = 0; i < products.length; i += productsPerSection) {
    sections.push(products.slice(i, i + productsPerSection));
  }

  return (
    <>
      <div className={styles.categoryHeader}>
        <Typography
          variant="h2"
          color="--tertiary-color"
          className={styles.categoryTitle}
        >
          {categoryNames[pathname.split("/").pop()]}
        </Typography>

        <Typography
          variant="body"
          color="--quaternary-color"
          className={styles.productsCount}
        >
          {products.length} produtos encontrados
        </Typography>
      </div>
      {sections.map((section, index) => (
        <ProductsSection key={index}>
          {section.map((product) => (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={formatPrice(product.price)}
              img={product.thumbnail}
            />
          ))}
        </ProductsSection>
      ))}
    </>
  );
};
