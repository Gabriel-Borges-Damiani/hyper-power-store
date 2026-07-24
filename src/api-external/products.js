import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {
  const response = await api("/products");
  return response.data;
};

export const getProductByCategory = async (category) => {
  const response = await api(`/products/category/${category}`);
  return response.data.products;
};

export const getRandomProductsByCategory = async (category) => {
  const { data } = await api.get(`/products/category/${category}`);

  return data.products.sort(() => Math.random() - 0.5).slice(0, 4);
};
