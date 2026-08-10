import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

export const registerUserDB = async (newUser) => {
  await http.post("/users", {
    ...newUser,
    favorites: [],
    cart: [],
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

export const getRecentSearches = async (id) => {
  const response = await http.get(`/users/${id}`);

  return response.data.pesquisasRecentes;
};

export const saveRecentSearch = async (id, term) => {
  const response = await http.get(`/users/${id}`);

  const searches = response.data.pesquisasRecentes || [];

  const updated = [term, ...searches.filter((item) => item !== term)].slice(
    0,
    5,
  );

  await http.patch(`/users/${id}`, {
    pesquisasRecentes: updated,
  });

  return updated;
};
export const addToCart = async () => {};
export const remoceFromCart = async () => {};

export const addFavorite = async (userId, product) => {
  const response = await http.get(`/users/${userId}`);

  const favorites = response.data.favorites || [];

  const alreadyExists = favorites.some((item) => item.id === product.id);

  if (alreadyExists) {
    return favorites;
  }

  const updatedFavorites = [...favorites, product];

  await http.patch(`/users/${userId}`, {
    favorites: updatedFavorites,
  });

  return updatedFavorites;
};

export const removeFavorite = async (userId, productId) => {
  const response = await http.get(`/users/${userId}`);

  const favorites = response.data.favorites || [];

  const updatedFavorites = favorites.filter((item) => item.id !== productId);

  await http.patch(`/users/${userId}`, {
    favorites: updatedFavorites,
  });

  return updatedFavorites;
};

export const getFavorites = async (userId) => {
  const response = await http.get(`/users/${userId}`);

  return response.data.favorites || [];
};

export const registerCategoryAccess = async () => {};
export const getRecommendedCategory = async () => {};
