import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

test("renders footer text with dev version by default", () => {
  render(<Footer />);
  expect(screen.getByText(/Open Equation Connect v/)).toBeInTheDocument();
  expect(screen.getByText(/dev/)).toBeInTheDocument();
});

test("displays git describe version when available", () => {
  const original = import.meta.env.VITE_GIT_DESCRIBE;
  import.meta.env.VITE_GIT_DESCRIBE = "2024.01.01-3-gabcdef";
  render(<Footer />);
  expect(screen.getByText(/2024\.01\.01-3-gabcdef/)).toBeInTheDocument();
  import.meta.env.VITE_GIT_DESCRIBE = original;
});
