import { act, screen, waitFor } from "@testing-library/react";
import { getInstallations } from "equation-connect";

import { renderWithProviders } from "../test-utils";
import Installations from "./Installations";

vi.mock("equation-connect", () => ({
  getInstallations: vi.fn(),
}));
vi.mock("./Installation", () => ({
  default: ({ id }: { id: string }) => (
    <div data-testid={`installation-${id}`}>{id}</div>
  ),
}));

const authenticatedUser = {
  uid: "user-123",
  email: "test@example.com",
  isAnonymous: false,
};

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders nothing before data loads", () => {
  vi.mocked(getInstallations).mockReturnValue(new Promise(() => {}) as any);
  const { container } = renderWithProviders(<Installations />, {
    user: authenticatedUser,
  });
  expect(container.querySelector("[data-testid]")).toBeNull();
});

test("fetches installations with user uid", async () => {
  vi.mocked(getInstallations).mockResolvedValue({} as any);
  renderWithProviders(<Installations />, { user: authenticatedUser });
  expect(getInstallations).toHaveBeenCalledWith("user-123");
  // Flush the async getInstallations resolution to avoid act() warning
  await act(async () => {});
});

test("renders installations after fetch", async () => {
  const mockData = {
    "install-1": { name: "Home", zones: {} },
    "install-2": { name: "Office", zones: {} },
  };
  vi.mocked(getInstallations).mockResolvedValue(mockData as any);
  renderWithProviders(<Installations />, { user: authenticatedUser });
  await waitFor(() => {
    expect(screen.getByTestId("installation-install-1")).toBeInTheDocument();
    expect(screen.getByTestId("installation-install-2")).toBeInTheDocument();
  });
});
