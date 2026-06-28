
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "History", path: "/history" },
  { name: "Reports", path: "/reports" },
  { name: "About", path: "/about" },
];

const desktopLinkClasses =
  "px-4 py-2 rounded-xl transition-all";

const mobileLinkClasses =
  "rounded-xl bg-white/10 px-4 py-3 text-slate-800 dark:text-white";

export default function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className="
        fixed top-4 left-1/2 z-40 w-[95%] max-w-7xl
        -translate-x-1/2 rounded-3xl border border-white/20
        bg-white/10 backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(31,38,135,0.18)]
        dark:bg-white/5
      "
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-2xl bg-cyan-500/20 backdrop-blur-xl
            "
          >
            <BrainCircuit className="h-6 w-6 text-cyan-500" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              NeuroVision AI
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Medical Analysis Platform
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${desktopLinkClasses} ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "text-slate-700 hover:bg-white/20 dark:text-slate-300"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className="text-slate-800 dark:text-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={mobileLinkClasses}
                >
                  {name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
