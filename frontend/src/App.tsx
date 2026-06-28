import AppRoutes from "./routes/AppRoutes";
import LiquidBackground from "./components/LiquidBackground";
import GlassThemeToggle from "./components/layout/GlassThemeToggle";

export default function App() {
  return (
    <>
      <LiquidBackground />
      <GlassThemeToggle />
      <AppRoutes />
    </>
  );
}