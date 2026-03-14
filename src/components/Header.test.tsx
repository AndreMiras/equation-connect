import { screen } from "@testing-library/react";

import { renderWithProviders } from "../test-utils";
import { registerIcons } from "../utils/helpers";
import Header from "./Header";

vi.mock("./LoginOrLogout", () => ({
  default: () => <div data-testid="login-or-logout" />,
}));

registerIcons();

test("renders brand text", () => {
  renderWithProviders(<Header />);
  expect(screen.getByText("Equation Connect")).toBeInTheDocument();
});

test("renders about link pointing to GitHub", () => {
  renderWithProviders(<Header />);
  const aboutLink = screen.getByText("About").closest("a");
  expect(aboutLink).toHaveAttribute(
    "href",
    "https://github.com/AndreMiras/equation-connect"
  );
});

test("renders thermometer icon in brand", () => {
  const { container } = renderWithProviders(<Header />);
  expect(
    container.querySelector("[data-icon='temperature-three-quarters']")
  ).toBeInTheDocument();
});

test("renders LoginOrLogout component", () => {
  renderWithProviders(<Header />);
  expect(screen.getByTestId("login-or-logout")).toBeInTheDocument();
});
