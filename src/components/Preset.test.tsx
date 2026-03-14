import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeviceStatus } from "equation-connect";

import { renderWithProviders } from "../test-utils";
import Preset from "./Preset";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
}));

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
  expect(screen.getByLabelText("Off")).toBeInTheDocument();
  expect(screen.getByLabelText("Ice")).toBeInTheDocument();
  expect(screen.getByLabelText("Eco")).toBeInTheDocument();
  expect(screen.getByLabelText("Comfort")).toBeInTheDocument();
});

test("clicking Off calls onPowerOff", async () => {
  renderWithProviders(<Preset {...defaultProps} />);
  await userEvent.click(screen.getByLabelText("Off"));
  expect(defaultProps.onPowerOff).toHaveBeenCalled();
  expect(defaultProps.onPreset).not.toHaveBeenCalled();
});

test("clicking a preset calls onPreset with correct value", async () => {
  renderWithProviders(<Preset {...defaultProps} />);
  await userEvent.click(screen.getByLabelText("Eco"));
  expect(defaultProps.onPreset).toHaveBeenCalledWith(DeviceStatus.Eco);
  expect(defaultProps.onPowerOff).not.toHaveBeenCalled();
});

test("Off button has active styling when power is false", () => {
  renderWithProviders(<Preset {...defaultProps} power={false} />);
  const offButton = screen.getByLabelText("Off");
  expect(offButton.className).toContain("bg-zinc-100");
});
