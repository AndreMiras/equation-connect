import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  database,
  deviceDataByIdPath,
  DeviceStatus,
  getDevice,
  setDevicePowerOff,
  setDevicePreset,
  updateDeviceTemperature,
} from "equation-connect";
import { onValue, ref } from "firebase/database";

import { renderWithProviders } from "../test-utils";
import Device from "./Device";

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
vi.mock("firebase/database", () => ({
  ref: vi.fn(),
  onValue: vi.fn(),
}));
vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useParams: () => ({ id: "device-abc" }),
}));

const mockDeviceData = {
  name: "Living Room Heater",
  temp: 21,
  temp_calc: 20.5,
  temp_probe: 19.8,
  backlight: 5,
  backlight_on: 1,
  nominal_power: 1500,
  status: DeviceStatus.Comfort,
  power: true,
};

const mockDevice = {
  data: mockDeviceData,
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(ref).mockReturnValue("mock-ref" as any);
  vi.mocked(deviceDataByIdPath).mockReturnValue("devices/device-abc/data");
});

test("renders loading state while device is loading", () => {
  vi.mocked(getDevice).mockReturnValue(new Promise(() => {}) as any);
  renderWithProviders(<Device />);
  expect(screen.getByText("Loading device...")).toBeInTheDocument();
});

test("fetches device and renders after load", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  expect(getDevice).toHaveBeenCalledWith("device-abc");
  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });
});

test("subscribes to real-time updates via onValue", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  expect(ref).toHaveBeenCalledWith(database, "devices/device-abc/data");
  expect(onValue).toHaveBeenCalledWith("mock-ref", expect.any(Function));
});

test("onValue callback updates displayed data", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  // Simulate real-time update
  const onValueCallback = vi.mocked(onValue).mock.calls[0][1];
  (onValueCallback as any)({
    val: () => ({ ...mockDeviceData, temp: 25 }),
  });

  await waitFor(() => {
    expect(screen.getByText("25")).toBeInTheDocument();
  });
});

test("preset change calls setDevicePreset", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByLabelText("Eco"));
  expect(setDevicePreset).toHaveBeenCalledWith("device-abc", DeviceStatus.Eco);
});

test("power off calls setDevicePowerOff", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByLabelText("Off"));
  expect(setDevicePowerOff).toHaveBeenCalledWith("device-abc");
});

test("temperature plus button calls updateDeviceTemperature", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByLabelText("Increase temperature"));

  expect(updateDeviceTemperature).toHaveBeenCalledWith("device-abc", 21.5);
});
