import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("auth_users")) || [];
  };

  const createUser = (data) => {
    return {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      createDate: new Date().toISOString(),
    };
  };

  const registerUser = (data) => {
    try {
      const actualUsers = getStoredUsers();
      if (actualUsers.find((u) => u.email === data.email)) {
        throw new Error("Esse email já existe, faça seu Login!");
      }

      const newUser = createUser(data);
      const newUserToLocalStorage = {
        name: newUser.name,
      };

      actualUsers.push(newUserToLocalStorage);
      localStorage.setItem("auth_users", JSON.stringify(actualUsers));

      setUser(newUserToLocalStorage);
      localStorage.setItem("auth_user", JSON.stringify(newUserToLocalStorage));

      return { succes: true, user: newUser };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  };

  const loginUser = (data) => {
    const actualUsers = getStoredUsers();

    try {
      const userFound = actualUsers.find((u) => u.email === data.email);

      if (userFound) {
        if (userFound.password !== data.password) {
          throw new Error("password:Senha incorreta! Tente novamente.");
        }
        const userLogged = {
          name: userFound.name,
        };
        localStorage.setItem("auth_user", JSON.stringify(userLogged));
        setUser(userLogged);

        return { succes: true, user: userLogged };
      } else {
        throw new Error("email:Email inválido! Tente novamente ou registre-se");
      }
    } catch (error) {
      const [field, message] = error.message.split(":");
      return {
        succes: false,
        field: message ? field : "email",
        error: message || error.message,
      };
    }
  };
  const isAuthenticated = !!user;

  return {
    user,
    registerUser,
    loginUser,
    isAuthenticated,
  };
};
