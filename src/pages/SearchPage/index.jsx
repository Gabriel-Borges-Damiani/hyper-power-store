import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProductsBySearch } from "../../api-external/products";

import { ProductsSection } from "../../components/ProductsSection";
import { ItemCard } from "../../components/ItemCard";
import Typography from "../../components/Typography";

import styles from "./search.page.module.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function findProducts() {
      const result = await getProductsBySearch(query);

      setProducts(result || []);
    }

    findProducts();
  }, [query]);

  const productsPerSection = 4;

  const sections = [];

  for (let i = 0; i < products.length; i += productsPerSection) {
    sections.push(products.slice(i, i + productsPerSection));
  }

  return (
    <>
      <div className={styles.searchHeader}>
        <Typography
          variant="h2"
          color="--tertiary-color"
          className={styles.searchTitle}
        >
          Resultados para "{query}"
        </Typography>

        <Typography
          variant="body"
          color="--quaternary-color"
          className={styles.productsCount}
        >
          {products.length} produtos encontrados
        </Typography>
      </div>

      {products.length === 0 ? (
        <div className={styles.noResults}>
          <Typography variant="h3" color="--tertiary-color">
            Nenhum produto encontrado
          </Typography>

          <Typography variant="body" color="--quaternary-color">
            Tente pesquisar utilizando outro termo.
          </Typography>
        </div>
      ) : (
        sections.map((section, index) => (
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
        ))
      )}
    </>
  );
};
