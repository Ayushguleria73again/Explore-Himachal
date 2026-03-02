"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-gray-100 dark:bg-slate-900 rounded-xl" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? 90 : 0,
            opacity: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} strokeWidth={2.5} />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-emerald-400"
        >
          <Moon size={20} strokeWidth={2.5} />
        </motion.div>
      </div>
    </motion.button>
  );
}
