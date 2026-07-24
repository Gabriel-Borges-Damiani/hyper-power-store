import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductByCategory } from "../../api-external/products";
import { useState } from "react";

import styles from "./category.page.module.css";
import { ProductsSection } from "../../components/ProductsSection";
import { ItemCard } from "../../components/ItemCard";

export const CategoryPage = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function findProducts() {
      setProducts(await getProductByCategory(pathname.split("/").pop()));
    }
    findProducts();
  }, [pathname]);

  const product = products[0];

  return (
    <>
      <ProductsSection>
        <ItemCard name={2} price={3}></ItemCard>
      </ProductsSection>
    </>
  );
};
