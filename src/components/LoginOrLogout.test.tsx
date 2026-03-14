import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders, anonymousUser } from "../test-utils";
import LoginOrLogout from "./LoginOrLogout";

jest.mock("./Login", () => {
  const MockLogin = () => <div data-testid="login">Login</div>;
  return MockLogin;
});
jest.mock("./Logout", () => {
  const MockLogout = () => <div data-testid="logout">Logout</div>;
  return MockLogout;
});

const authenticatedUser = {
  uid: "user-123",
  email: "test@example.com",
  isAnonymous: false,
};

test("anonymous user sees login form", () => {
  renderWithProviders(<LoginOrLogout />, { user: anonymousUser });
  expect(screen.getByTestId("login")).toBeInTheDocument();
  expect(screen.queryByTestId("logout")).not.toBeInTheDocument();
});

test("authenticated user sees logout button", () => {
  renderWithProviders(<LoginOrLogout />, { user: authenticatedUser });
  expect(screen.getByTestId("logout")).toBeInTheDocument();
  expect(screen.queryByTestId("login")).not.toBeInTheDocument();
});
