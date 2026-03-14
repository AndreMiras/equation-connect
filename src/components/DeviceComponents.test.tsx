import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { renderWithProviders } from "../test-utils";
import { registerIcons } from "../utils/helpers";
import { NumberInput, SimplifiedBacklight } from "./Device";

jest.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  auth: { currentUser: null },
  database: {},
  login: jest.fn(),
  logout: jest.fn(),
  init: jest.fn(() => ({ auth: { currentUser: null } })),
  getInstallations: jest.fn(),
  getDevice: jest.fn(),
  deviceDataByIdPath: jest.fn(),
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

registerIcons();

describe("NumberInput", () => {
  test("displays the current value", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <NumberInput value={10} onChange={onChange} step={1} />
    );
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });

  test("plus button increments by step", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <NumberInput value={10} onChange={onChange} step={0.5} />
    );
    const plusButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector("[data-icon='plus']") !== null);
    userEvent.click(plusButton!);
    expect(onChange).toHaveBeenCalledWith(10.5);
  });

  test("minus button decrements by step", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <NumberInput value={10} onChange={onChange} step={2} />
    );
    const minusButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector("[data-icon='minus']") !== null);
    userEvent.click(minusButton!);
    expect(onChange).toHaveBeenCalledWith(8);
  });
});

describe("SimplifiedBacklight", () => {
  test("renders On and Off buttons", () => {
    renderWithProviders(
      <SimplifiedBacklight value={true} onChange={jest.fn()} />
    );
    expect(screen.getByText("On")).toBeInTheDocument();
    expect(screen.getByText("Off")).toBeInTheDocument();
  });

  test("clicking Off calls onChange with false", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <SimplifiedBacklight value={true} onChange={onChange} />
    );
    userEvent.click(screen.getByText("Off"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test("clicking On calls onChange with true", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <SimplifiedBacklight value={false} onChange={onChange} />
    );
    userEvent.click(screen.getByText("On"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
