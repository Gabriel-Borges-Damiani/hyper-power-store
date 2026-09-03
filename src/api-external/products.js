import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

const allowedCategories = [
  "smartphones",
  "mobile-accessories",
  "tablets",
  "laptops",
];

export const getProduct = async (query) => {
  const { data } = await api(`/products/search?q=${query}`);
  return data.products;
};

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

export const getProductsBySearch = async (search) => {
  const response = await api.get(`/products/search?q=${search}`);

  return response.data.products.filter((product) =>
    allowedCategories.includes(product.category),
  );
};
