import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home link", () => {
  render(<App />);
  const linkElement = screen.getByText(/equation connect/i);
  expect(linkElement).toBeInTheDocument();
});
