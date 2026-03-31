import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { colorThemes } from "../utils/theme";

const Navbar = () => {
  const [theme, setTheme] = useState("sunset");
  const [open, setOpen] = useState(false);

  // ✅ Load saved theme
 useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
  }
}, []);

  // ✅ Apply theme globally
 useEffect(() => {
  const root = document.documentElement; // ✅ FIRST define

  const selected = colorThemes[theme];

  root.style.setProperty("--bg", selected.background_color);
  root.style.setProperty("--surface", selected.surface_color);
  root.style.setProperty("--text", selected.text_color);
  root.style.setProperty("--primary", selected.primary_action_color);
  root.style.setProperty("--secondary", selected.secondary_action_color);

  // ✅ border fix (important)
  if (theme === "light") {
    root.style.setProperty("--border", "rgba(0,0,0,0.08)");
  } else {
    root.style.setProperty("--border", "rgba(255,255,255,0.08)");
  }

  localStorage.setItem("theme", theme);
}, [theme]);


  return (
    <header className="fixed top-[12px] left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-[7px]">

        <nav className="glass rounded-full px-6 py-[15px] flex items-center justify-between border border-white/10 shadow-lg">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center font-bold text-[var(--text)]">
              AG
            </div>
            <span className="text-sm text-[var(--text)]/70 tracking-widest uppercase">
              Portfolio
            </span>
          </div>

          {/* LINKS */}
          <div className="hidden md:flex gap-8 text-sm text-[var(--text)]/70">
            <a href="#about" className="hover:text-[var(--text)] transition">About</a>
            <a href="#projects" className="hover:text-[var(--text)] transition">Projects</a>
            <a href="#contact" className="hover:text-[var(--text)] transition">Contact</a>
          </div>

          {/* THEME SWITCHER */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--surface)] hover:scale-105 transition text-sm"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: colorThemes[theme].primary_action_color }}
              />
              {colorThemes[theme].name}
              <FiChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl glass border border-white/10 p-2 flex flex-col gap-1 backdrop-blur-md">

                {Object.entries(colorThemes).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    hover:bg-white/10 ${
                      theme === key
                        ? "bg-white/10 text-[var(--text)]"
                        : "text-[var(--text)]/70"
                    }`}
                  >
                    {/* color preview */}
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ background: value.primary_action_color }}
                    />

                    {value.name}
                  </button>
                ))}

              </div>
            )}

          </div>

        </nav>

      </div>
    </header>
  );
};

export default Navbar;