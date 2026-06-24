import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUserDB = async (newUser) => {
  await http.post("/users", {
    newUser,
    favoritos: [],
    carrinho: [],
    categoriasRecentes: [],
  });
};

export const loginUser = async () => {};
export const logoutUser = async () => {};
export const deleteUser = async () => {};

export const addToCart = async () => {};
export const remoceFromCart = async () => {};

export const addFavorite = async () => {};
export const removeFavorite = async () => {};

export const registerCategoryAccess = async () => {};
export const getRecommendedCategory = async () => {};
