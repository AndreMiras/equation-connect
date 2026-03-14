import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeviceStatus } from "equation-connect";

import { renderWithProviders } from "../test-utils";
import { registerIcons } from "../utils/helpers";
import Preset from "./Preset";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
}));

registerIcons();

const defaultProps = {
  status: DeviceStatus.Comfort,
  onPreset: vi.fn(),
  power: true,
  onPowerOff: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders Off button and all preset buttons", () => {
  renderWithProviders(<Preset {...defaultProps} />);
  expect(screen.getByText("Off")).toBeInTheDocument();
  expect(screen.getByText("Ice")).toBeInTheDocument();
  expect(screen.getByText("Eco")).toBeInTheDocument();
  expect(screen.getByText("Comfort")).toBeInTheDocument();
});

test("clicking Off calls onPowerOff", async () => {
  renderWithProviders(<Preset {...defaultProps} />);
  await userEvent.click(screen.getByText("Off"));
  expect(defaultProps.onPowerOff).toHaveBeenCalled();
  expect(defaultProps.onPreset).not.toHaveBeenCalled();
});

test("clicking a preset calls onPreset with correct value", async () => {
  renderWithProviders(<Preset {...defaultProps} />);
  await userEvent.click(screen.getByText("Eco"));
  expect(defaultProps.onPreset).toHaveBeenCalledWith(DeviceStatus.Eco);
  expect(defaultProps.onPowerOff).not.toHaveBeenCalled();
});

test("Off button is selected when power is false", () => {
  renderWithProviders(<Preset {...defaultProps} power={false} />);
  const offButton = document.getElementById(
    "radio-options-off"
  ) as HTMLInputElement;
  expect(offButton.checked).toBe(true);
});

test("uses custom name prop for button IDs", () => {
  renderWithProviders(<Preset {...defaultProps} name="my-preset" />);
  expect(document.getElementById("radio-my-preset-off")).toBeInTheDocument();
});
