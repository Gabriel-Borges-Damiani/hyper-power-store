import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/Main";
import { AuthLayout } from "../layouts/Auth";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Products } from "../pages/Products";
import { Category } from "../pages/Category";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="category" element={<Category />}></Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
