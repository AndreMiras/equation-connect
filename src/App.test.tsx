import { render, screen } from "@testing-library/react";

import App from "./App";

jest.mock("./components/Home", () => {
  const MockHome = () => <div data-testid="home-page">Home</div>;
  return MockHome;
});
jest.mock("./components/Device", () => {
  const MockDevice = () => <div data-testid="device-page">Device</div>;
  return MockDevice;
});
jest.mock("./components/Header", () => {
  const MockHeader = () => <div data-testid="header">Header</div>;
  return MockHeader;
});

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
