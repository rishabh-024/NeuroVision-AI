import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlassNavbar from "../components/layout/GlassNavbar";

import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import ReportsPage from "../pages/ReportsPage";
import AboutPage from "../pages/AboutPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          overflow-x-hidden
        "
      >
        <GlassNavbar />

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/history"
            element={<HistoryPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}