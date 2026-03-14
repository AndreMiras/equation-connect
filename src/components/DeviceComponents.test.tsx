import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../test-utils";
import { NumberInput, SimplifiedBacklight } from "./Device";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  auth: { currentUser: null },
  database: {},
  login: vi.fn(),
  logout: vi.fn(),
  init: vi.fn(() => ({ auth: { currentUser: null } })),
  getInstallations: vi.fn(),
  getDevice: vi.fn(),
  deviceDataByIdPath: vi.fn(),
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

describe("NumberInput", () => {
  test("displays the current value", () => {
    const onChange = vi.fn();
    renderWithProviders(
      <NumberInput value={10} onChange={onChange} step={1} />,
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("plus button increments by step", async () => {
    const onChange = vi.fn();
    renderWithProviders(
      <NumberInput
        value={10}
        onChange={onChange}
        step={0.5}
        label="Temperature"
      />,
    );
    await userEvent.click(screen.getByLabelText("Increase Temperature"));
    expect(onChange).toHaveBeenCalledWith(10.5);
  });

  test("minus button decrements by step", async () => {
    const onChange = vi.fn();
    renderWithProviders(
      <NumberInput
        value={10}
        onChange={onChange}
        step={2}
        label="Temperature"
      />,
    );
    await userEvent.click(screen.getByLabelText("Decrease Temperature"));
    expect(onChange).toHaveBeenCalledWith(8);
  });
});

describe("SimplifiedBacklight", () => {
  test("renders On and Off buttons", () => {
    renderWithProviders(
      <SimplifiedBacklight value={true} onChange={vi.fn()} />,
    );
    expect(screen.getByText("On")).toBeInTheDocument();
    expect(screen.getByText("Off")).toBeInTheDocument();
  });

  test("clicking Off calls onChange with false", async () => {
    const onChange = vi.fn();
    renderWithProviders(
      <SimplifiedBacklight value={true} onChange={onChange} />,
    );
    await userEvent.click(screen.getByText("Off"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test("clicking On calls onChange with true", async () => {
    const onChange = vi.fn();
    renderWithProviders(
      <SimplifiedBacklight value={false} onChange={onChange} />,
    );
    await userEvent.click(screen.getByText("On"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
