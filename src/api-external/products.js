import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {
  const response = await api();
  return response;
};
