import { screen } from "@testing-library/react";

import { anonymousUser, renderWithProviders } from "../test-utils";
import Home from "./Home";

vi.mock("./Installations", () => ({
  default: () => <div data-testid="installations">Installations</div>,
}));

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
