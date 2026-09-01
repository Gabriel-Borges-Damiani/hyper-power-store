import { useState } from "react";
import { getAllUsers, getUserByEmail } from "../api/userApi";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const createUser = (data) => {
    return {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      createDate: new Date().toISOString(),
    };
  };

  const registerUser = async (data) => {
    try {
      const actualUsers = await getAllUsers();
      if (actualUsers.find((u) => u.email === data.email)) {
        throw new Error("Esse email já existe, faça seu Login!");
      }

      const newUser = createUser(data);
      const newUserToLocalStorage = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      setUser(newUserToLocalStorage);
      localStorage.setItem("auth_user", JSON.stringify(newUserToLocalStorage));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginUser = async (data) => {
    try {
      const userFound = await getUserByEmail(data.email);

      if (userFound) {
        if (userFound.password !== data.password) {
          throw new Error("password:Senha incorreta! Tente novamente.");
        }
        const userLogged = {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
        localStorage.setItem("auth_user", JSON.stringify(userLogged));
        setUser(userLogged);
        notifyAuthChange();

        return { success: true, user: userLogged };
      } else {
        throw new Error("email:Email inválido! Tente novamente ou registre-se");
      }
    } catch (error) {
      const [field, message] = error.message.split(":");
      return {
        success: false,
        field: message ? field : "email",
        error: message || error.message,
      };
    }
  };

  const notifyAuthChange = () => {
    window.dispatchEvent(new Event("auth-changed"));
  };

  const logoutUser = () => {
    localStorage.removeItem("auth_user");
    setUser(null);

    notifyAuthChange();

    return { success: true };
  };

  const isAuthenticated = !!user;

  return {
    user,
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated,
  };
};
