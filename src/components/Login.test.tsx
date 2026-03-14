import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { auth, FirebaseConfig, init, login } from "equation-connect";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

import { anonymousUser, renderWithProviders } from "../test-utils";
import Login from "./Login";

jest.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  auth: { currentUser: null },
  database: {},
  login: jest.fn(),
  logout: jest.fn(),
  init: jest.fn(() => ({ auth: { currentUser: null } })),
  getInstallations: jest.fn(),
  getDevice: jest.fn(),
  deviceDataByIdPath: jest.fn((id: string) => `devices/${id}/data`),
  setDevicePowerOff: jest.fn(),
  setDevicePreset: jest.fn(),
  setDeviceBacklight: jest.fn(),
  setDeviceBacklightOn: jest.fn(),
  setDeviceNominalPower: jest.fn(),
  updateDeviceTemperature: jest.fn(),
  setZonePreset: jest.fn(),
  setZonePowerOff: jest.fn(),
  FirebaseConfig: {
    0: "EquationConnect",
    1: "RointeConnect",
    EquationConnect: 0,
    RointeConnect: 1,
  },
}));
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
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
  const setUser = jest.fn();
  (onAuthStateChanged as jest.Mock).mockImplementation((_, callback) => {
    callback({ uid: "u1", email: "a@b.com", isAnonymous: false });
  });
  renderWithProviders(<Login />, { setUser });
  expect(setUser).toHaveBeenCalledWith({
    uid: "u1",
    email: "a@b.com",
    isAnonymous: false,
  });
});

test("onAuthStateChanged callback sets anonymous user on null", () => {
  const setUser = jest.fn();
  (onAuthStateChanged as jest.Mock).mockImplementation((_, callback) => {
    callback(null);
  });
  renderWithProviders(<Login />, { setUser });
  expect(setUser).toHaveBeenCalledWith(anonymousUser);
});

test("login button calls login with email and password", async () => {
  const mockUser = { uid: "u1", email: "a@b.com", isAnonymous: false };
  (login as jest.Mock).mockResolvedValue(mockUser);
  const setUser = jest.fn();
  renderWithProviders(<Login />, { setUser });

  userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  userEvent.type(screen.getByLabelText(/password/i), "secret");
  userEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith("a@b.com", "secret");
    expect(setUser).toHaveBeenCalledWith(mockUser);
  });
});

test("login error is caught and logged", async () => {
  const error = new Error("auth failed");
  (login as jest.Mock).mockRejectedValue(error);
  const consoleSpy = jest.spyOn(console, "error").mockImplementation();
  renderWithProviders(<Login />);

  userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  userEvent.type(screen.getByLabelText(/password/i), "wrong");
  userEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
  consoleSpy.mockRestore();
});

test("config switch calls init and re-registers auth listener", async () => {
  const newAuth = { currentUser: null };
  (init as jest.Mock).mockReturnValue({ auth: newAuth });
  renderWithProviders(<Login />);

  // The split dropdown toggle button
  const toggleButton = document.getElementById("dropdown-split-basic")!;
  userEvent.click(toggleButton);
  await waitFor(() => {
    userEvent.click(screen.getByText(/equation login/i));
  });

  expect(init).toHaveBeenCalledWith(FirebaseConfig.EquationConnect);
  expect(onAuthStateChanged).toHaveBeenCalledWith(
    newAuth,
    expect.any(Function)
  );
});
