import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DeviceStatus,
  setZonePowerOff,
  setZonePreset,
  ZoneOverviewType,
} from "equation-connect";
import { HashRouter as Router } from "react-router";

import { registerIcons } from "../utils/helpers";
import ZoneOverview from "./ZoneOverview";

registerIcons();

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  setZonePreset: vi.fn(),
  setZonePowerOff: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const installationId = "-OqGNxWzMGLOcFc5Vcsr";
const zoneProps: ZoneOverviewType = {
  comfort: 22,
  devices: {
    D89DDF3A7D80D89DDF3A7D80: true,
    F9097F334FC4F9097F334FC4: true,
  },
  eco: 16,
  id: "-MpGOkgR4zExLBUDUafq",
  mode: "manual",
  name: "Living room",
  power: true,
  temp: 21,
  type: "radiator",
  status: DeviceStatus.Comfort,
};

test("ZoneOverview renders correctly", () => {
  const { asFragment } = render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("ZoneOverview devices is optional", () => {
  const zoneProps2 = { ...zoneProps };
  delete zoneProps2.devices;
  const { asFragment } = render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps2} />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("clicking preset calls setZonePreset and updates state", async () => {
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>
  );
  await userEvent.click(screen.getByText("Eco"));
  expect(setZonePreset).toHaveBeenCalledWith(
    installationId,
    zoneProps.id,
    DeviceStatus.Eco
  );
});

test("clicking off calls setZonePowerOff", async () => {
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>
  );
  const offButton = document.getElementById(
    `radio-options-${zoneProps.id}-off`
  )!;
  await userEvent.click(offButton);
  expect(setZonePowerOff).toHaveBeenCalledWith(installationId, zoneProps.id);
});

test("useEffect syncs power and status props to state", () => {
  const { rerender } = render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>
  );
  const updatedZone = {
    ...zoneProps,
    power: false,
    status: DeviceStatus.Eco,
  };
  rerender(
    <Router>
      <ZoneOverview installationId={installationId} zone={updatedZone} />
    </Router>
  );
  // The Off button should now be selected (power=false)
  const offButton = document.getElementById(
    `radio-options-${zoneProps.id}-off`
  ) as HTMLInputElement;
  expect(offButton.checked).toBe(true);
});
