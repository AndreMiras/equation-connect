import { Github, Monitor, Moon, Sun, Thermometer } from "lucide-react";
import { useContext } from "react";

import { ThemeContext, ThemePreference } from "../context/theme";
import LoginOrLogout from "./LoginOrLogout";

const nextPreference: Record<ThemePreference, ThemePreference> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const themeIcon: Record<ThemePreference, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const Header = () => {
  const { preference, setPreference } = useContext(ThemeContext);
  const Icon = themeIcon[preference];

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <a
            href={import.meta.env.BASE_URL}
            className="flex items-center gap-2 text-fg no-underline"
          >
            <Thermometer className="h-5 w-5 text-amber-500" />
            <span className="font-semibold">Equation Connect</span>
          </a>
          <a
            href="https://github.com/AndreMiras/equation-connect"
            className="flex items-center gap-1 text-sm text-fg-muted no-underline hover:text-fg"
          >
            <Github className="h-4 w-4" />
            <span>About</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPreference(nextPreference[preference])}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition hover:bg-inset hover:text-fg"
            aria-label={`Theme: ${preference}`}
            title={`Theme: ${preference}`}
          >
            <Icon className="h-4 w-4" />
          </button>
          <LoginOrLogout />
        </div>
      </div>
    </header>
  );
};

export default Header;
