import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUserDB = async (newUser) => {
  await http.post("/users", {
    ...newUser,
    favoritos: [],
    carrinho: [],
    categoriasRecentes: [],
  });
};

export const getAllUsers = async () => {
  const response = await http.get("/users");
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await http.get(`/users?email=${email}`);
  return response.data.length > 0 ? response.data[0] : null;
};

export const getUserById = async (id) => {
  const response = await http.get(`/users/${id}`);
  return response.data;
};

export const logoutUser = async () => {};
export const deleteUser = async () => {};

export const addToCart = async () => {};
export const remoceFromCart = async () => {};

export const addFavorite = async () => {};
export const removeFavorite = async () => {};

export const registerCategoryAccess = async () => {};
export const getRecommendedCategory = async () => {};
