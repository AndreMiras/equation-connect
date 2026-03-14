import { Github, Thermometer } from "lucide-react";

import LoginOrLogout from "./LoginOrLogout";

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <a
          href={import.meta.env.BASE_URL}
          className="flex items-center gap-2 text-zinc-900 no-underline"
        >
          <Thermometer className="h-5 w-5 text-amber-500" />
          <span className="font-semibold">Equation Connect</span>
        </a>
        <a
          href="https://github.com/AndreMiras/equation-connect"
          className="flex items-center gap-1 text-sm text-zinc-500 no-underline hover:text-zinc-900"
        >
          <Github className="h-4 w-4" />
          <span>About</span>
        </a>
      </div>
      <LoginOrLogout />
    </div>
  </header>
);

export default Header;
