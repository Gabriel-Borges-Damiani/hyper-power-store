import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/Main";
import { AuthLayout } from "../layouts/Auth";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
        <Route path="/auth" element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
