import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders, anonymousUser } from "../test-utils";
import Home from "./Home";

jest.mock("./Installations", () => {
  const MockInstallations = () => (
    <div data-testid="installations">Installations</div>
  );
  return MockInstallations;
});

const authenticatedUser = {
  uid: "user-123",
  email: "test@example.com",
  isAnonymous: false,
};

test("anonymous user sees empty div", () => {
  const { container } = renderWithProviders(<Home />, {
    user: anonymousUser,
  });
  expect(container.querySelector("[data-testid]")).toBeNull();
});

test("authenticated user sees installations", () => {
  renderWithProviders(<Home />, { user: authenticatedUser });
  expect(screen.getByTestId("installations")).toBeInTheDocument();
});
