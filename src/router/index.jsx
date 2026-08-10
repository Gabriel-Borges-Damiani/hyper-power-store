import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/Main";
import { AuthLayout } from "../layouts/Auth";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Products } from "../pages/Products";
import { CategoryPage } from "../pages/CategoryPage";
import { SearchPage } from "../pages/SearchPage";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="menu" element={<Menu />}></Route>
            <Route path="product/:id" element={<Products />}></Route>
            <Route path="category/:category" element={<CategoryPage />}></Route>
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
};
