import { screen } from "@testing-library/react";

import { anonymousUser, renderWithProviders } from "../test-utils";
import LoginOrLogout from "./LoginOrLogout";

vi.mock("./Login", () => ({
  default: () => <div data-testid="login">Login</div>,
}));
vi.mock("./Logout", () => ({
  default: () => <div data-testid="logout">Logout</div>,
}));

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
