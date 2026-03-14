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
import { registerIcons } from "../utils/helpers";
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

registerIcons();

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

test("renders empty div while device is loading", () => {
  vi.mocked(getDevice).mockReturnValue(new Promise(() => {}) as any);
  const { container } = renderWithProviders(<Device />);
  expect(container.firstChild).toBeEmptyDOMElement();
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
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
  });
});

test("preset change calls setDevicePreset", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("Eco"));
  expect(setDevicePreset).toHaveBeenCalledWith("device-abc", DeviceStatus.Eco);
});

test("power off calls setDevicePowerOff", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  // Click the power-off "Off" button in the Preset (not the backlight Off)
  const presetOffButton = document.getElementById("radio-options-off")!;
  await userEvent.click(presetOffButton);
  expect(setDevicePowerOff).toHaveBeenCalledWith("device-abc");
});

test("temperature plus button calls updateDeviceTemperature", async () => {
  vi.mocked(getDevice).mockResolvedValue(mockDevice as any);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  // Find the temperature NumberInput's plus button (first one in the DOM)
  const buttons = screen.getAllByRole("button");
  // Temperature section has minus(-) and plus(+) buttons
  // Find the button containing the "plus" icon
  const plusButton = buttons.find(
    (btn) => btn.querySelector("[data-icon='plus']") !== null,
  );
  expect(plusButton).toBeDefined();
  await userEvent.click(plusButton!);

  expect(updateDeviceTemperature).toHaveBeenCalledWith("device-abc", 21.5);
});
