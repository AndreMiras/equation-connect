import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { auth, FirebaseConfig, init, login } from "equation-connect";
import { onAuthStateChanged } from "firebase/auth";

import { anonymousUser, renderWithProviders } from "../test-utils";
import Login from "./Login";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  auth: { currentUser: null },
  database: {},
  login: vi.fn(),
  logout: vi.fn(),
  init: vi.fn(() => ({ auth: { currentUser: null } })),
  getInstallations: vi.fn(),
  getDevice: vi.fn(),
  deviceDataByIdPath: vi.fn((id: string) => `devices/${id}/data`),
  setDevicePowerOff: vi.fn(),
  setDevicePreset: vi.fn(),
  setDeviceBacklight: vi.fn(),
  setDeviceBacklightOn: vi.fn(),
  setDeviceNominalPower: vi.fn(),
  updateDeviceTemperature: vi.fn(),
  setZonePreset: vi.fn(),
  setZonePowerOff: vi.fn(),
  FirebaseConfig: {
    0: "EquationConnect",
    1: "RointeConnect",
    EquationConnect: 0,
    RointeConnect: 1,
  },
}));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders email and password fields and login button", () => {
  renderWithProviders(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test("registers onAuthStateChanged on mount", () => {
  renderWithProviders(<Login />);
  expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));
});

test("onAuthStateChanged callback sets user when user logs in", () => {
  const setUser = vi.fn();
  vi.mocked(onAuthStateChanged).mockImplementation((_: any, callback: any) => {
    (callback as any)({ uid: "u1", email: "a@b.com", isAnonymous: false });
    return () => {};
  });
  renderWithProviders(<Login />, { setUser });
  expect(setUser).toHaveBeenCalledWith({
    uid: "u1",
    email: "a@b.com",
    isAnonymous: false,
  });
});

test("onAuthStateChanged callback sets anonymous user on null", () => {
  const setUser = vi.fn();
  vi.mocked(onAuthStateChanged).mockImplementation((_: any, callback: any) => {
    (callback as any)(null);
    return () => {};
  });
  renderWithProviders(<Login />, { setUser });
  expect(setUser).toHaveBeenCalledWith(anonymousUser);
});

test("login button calls login with email and password", async () => {
  const mockUser = { uid: "u1", email: "a@b.com", isAnonymous: false };
  vi.mocked(login).mockResolvedValue(mockUser as any);
  const setUser = vi.fn();
  renderWithProviders(<Login />, { setUser });

  await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  await userEvent.type(screen.getByLabelText(/password/i), "secret");
  await userEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith("a@b.com", "secret");
    expect(setUser).toHaveBeenCalledWith(mockUser);
  });
});

test("login error is caught and logged", async () => {
  const error = new Error("auth failed");
  vi.mocked(login).mockRejectedValue(error);
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  renderWithProviders(<Login />);

  await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  await userEvent.type(screen.getByLabelText(/password/i), "wrong");
  await userEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
  consoleSpy.mockRestore();
});

test("config switch calls init and re-registers auth listener", async () => {
  const newAuth = { currentUser: null };
  vi.mocked(init).mockReturnValue({ auth: newAuth } as any);
  renderWithProviders(<Login />);

  // The split dropdown toggle button
  const toggleButton = document.getElementById("dropdown-split-basic")!;
  await userEvent.click(toggleButton);
  await userEvent.click(screen.getByText(/equation login/i));

  expect(init).toHaveBeenCalledWith(FirebaseConfig.EquationConnect);
  expect(onAuthStateChanged).toHaveBeenCalledWith(
    newAuth,
    expect.any(Function)
  );
});
