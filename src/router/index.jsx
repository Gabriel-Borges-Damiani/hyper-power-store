import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/Main";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
