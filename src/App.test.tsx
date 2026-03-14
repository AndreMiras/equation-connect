import { render, screen } from "@testing-library/react";

import App from "./App";

vi.mock("./components/Home", () => ({
  default: () => <div data-testid="home-page">Home</div>,
}));
vi.mock("./components/Device", () => ({
  default: () => <div data-testid="device-page">Device</div>,
}));
vi.mock("./components/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

beforeEach(() => {
  window.location.hash = "#/";
});

test("renders header", () => {
  render(<App />);
  expect(screen.getByTestId("header")).toBeInTheDocument();
});

test("root route renders Home", () => {
  window.location.hash = "#/";
  render(<App />);
  expect(screen.getByTestId("home-page")).toBeInTheDocument();
});

test("devices/:id route renders Device", () => {
  window.location.hash = "#/devices/abc123";
  render(<App />);
  expect(screen.getByTestId("device-page")).toBeInTheDocument();
});
