import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const createUser = (data) => {
    ({
      id: new Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      createDate: new Date().toISOString(),
    });
  };

  const registerUser = (data) => {
    try {
      const actualUsers = JSON.parse(localStorage.getItem("auth_users")) || [];

      if (actualUsers.find((u) => u.email === data.email)) {
        throw new Error("This user already exist, go to Login!");
      }

      const newUser = createUser(data);

      actualUsers.push(newUser);
      localStorage.setItem("auth_users", JSON.stringify(actualUsers));

      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));

      return { succes: true, user: newUser };
    } catch (error) {
      return { succes: false, error: error.message };
    }
  };

  return {
    user,
    registerUser,
  };
};
