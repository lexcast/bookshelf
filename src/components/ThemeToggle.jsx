import { useState } from "react";

const Sun = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

// index.html sets the initial theme before React loads, so read it from there
const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme);
  const dark = theme === "dark";

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Tema oscuro"
      title={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={toggle}
      className="relative flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border border-line bg-field p-1 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span
        className={`flex size-7 items-center justify-center rounded-full bg-accent text-white shadow-sm transition-transform duration-300 dark:text-stone-900 ${dark ? "translate-x-7" : ""}`}
      >
        {dark ? <Moon /> : <Sun />}
      </span>
    </button>
  );
};

export default ThemeToggle;
