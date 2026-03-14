import { screen, waitFor } from "@testing-library/react";
import { getInstallations } from "equation-connect";

import { renderWithProviders } from "../test-utils";
import Installations from "./Installations";

jest.mock("equation-connect", () => ({
  getInstallations: jest.fn(),
}));
jest.mock("./Installation", () => {
  const MockInstallation = ({ id }: { id: string }) => (
    <div data-testid={`installation-${id}`}>{id}</div>
  );
  return MockInstallation;
});

const authenticatedUser = {
  uid: "user-123",
  email: "test@example.com",
  isAnonymous: false,
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders nothing before data loads", () => {
  (getInstallations as jest.Mock).mockReturnValue(new Promise(() => {}));
  const { container } = renderWithProviders(<Installations />, {
    user: authenticatedUser,
  });
  expect(container.querySelector("[data-testid]")).toBeNull();
});

test("fetches installations with user uid", () => {
  (getInstallations as jest.Mock).mockResolvedValue({});
  renderWithProviders(<Installations />, { user: authenticatedUser });
  expect(getInstallations).toHaveBeenCalledWith("user-123");
});

test("renders installations after fetch", async () => {
  const mockData = {
    "install-1": { name: "Home", zones: {} },
    "install-2": { name: "Office", zones: {} },
  };
  (getInstallations as jest.Mock).mockResolvedValue(mockData);
  renderWithProviders(<Installations />, { user: authenticatedUser });
  await waitFor(() => {
    expect(screen.getByTestId("installation-install-1")).toBeInTheDocument();
    expect(screen.getByTestId("installation-install-2")).toBeInTheDocument();
  });
});
