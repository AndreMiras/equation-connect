const Footer = () => (
  <footer className="mt-auto py-6 text-center text-xs text-zinc-400">
    Open Equation Connect v{import.meta.env.VITE_GIT_DESCRIBE || "dev"}
  </footer>
);

export default Footer;
