import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function GlassThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="
        fixed top-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full border
        border-white/20 dark:border-white/10
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(31,38,135,0.25)]
        transition-all duration-300
      "
    >
      <motion.div
        key={theme}
        initial={{
          rotate: -180,
          opacity: 0,
        }}
        animate={{
          rotate: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        {theme === "light" ? (
          <Moon
            size={22}
            className="text-slate-800"
          />
        ) : (
          <Sun
            size={22}
            className="text-yellow-300"
          />
        )}
      </motion.div>
    </motion.button>
  );
}