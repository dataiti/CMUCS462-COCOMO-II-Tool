import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CalculatePage from "./pages/CalculatePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DetailConstruction from "./pages/DetailConstruction";
import UpdateConstruction from "./pages/UpdateConstruction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<MainLayout />}>
        <Route path="/calculate" element={<CalculatePage />} />
        <Route path="/construction/:id" element={<DetailConstruction />} />
        <Route
          path="/update-construction/:id"
          element={<UpdateConstruction />}
        />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
