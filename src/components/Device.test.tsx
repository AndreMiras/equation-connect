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
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
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
  jest.clearAllMocks();
  (ref as jest.Mock).mockReturnValue("mock-ref");
  (deviceDataByIdPath as jest.Mock).mockReturnValue("devices/device-abc/data");
});

test("renders empty div while device is loading", () => {
  (getDevice as jest.Mock).mockReturnValue(new Promise(() => {}));
  const { container } = renderWithProviders(<Device />);
  expect(container.firstChild).toBeEmptyDOMElement();
});

test("fetches device and renders after load", async () => {
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
  renderWithProviders(<Device />);

  expect(getDevice).toHaveBeenCalledWith("device-abc");
  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });
});

test("subscribes to real-time updates via onValue", async () => {
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
  renderWithProviders(<Device />);

  expect(ref).toHaveBeenCalledWith(database, "devices/device-abc/data");
  expect(onValue).toHaveBeenCalledWith("mock-ref", expect.any(Function));
});

test("onValue callback updates displayed data", async () => {
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  // Simulate real-time update
  const onValueCallback = (onValue as jest.Mock).mock.calls[0][1];
  onValueCallback({
    val: () => ({ ...mockDeviceData, temp: 25 }),
  });

  await waitFor(() => {
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
  });
});

test("preset change calls setDevicePreset", async () => {
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText("Eco"));
  expect(setDevicePreset).toHaveBeenCalledWith("device-abc", DeviceStatus.Eco);
});

test("power off calls setDevicePowerOff", async () => {
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
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
  (getDevice as jest.Mock).mockResolvedValue(mockDevice);
  renderWithProviders(<Device />);

  await waitFor(() => {
    expect(screen.getByText("Living Room Heater")).toBeInTheDocument();
  });

  // Find the temperature NumberInput's plus button (first one in the DOM)
  const buttons = screen.getAllByRole("button");
  // Temperature section has minus(-) and plus(+) buttons
  // Find the button containing the "plus" icon
  const plusButton = buttons.find(
    (btn) => btn.querySelector("[data-icon='plus']") !== null
  );
  expect(plusButton).toBeDefined();
  await userEvent.click(plusButton!);

  expect(updateDeviceTemperature).toHaveBeenCalledWith("device-abc", 21.5);
});
