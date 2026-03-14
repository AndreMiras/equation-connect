import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DeviceStatus,
  setZonePowerOff,
  setZonePreset,
  ZoneOverviewType,
} from "equation-connect";
import { HashRouter as Router } from "react-router";

import ZoneOverview from "./ZoneOverview";

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

test("ZoneOverview renders zone name and device cards", () => {
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>,
  );
  expect(screen.getByText("Living room")).toBeInTheDocument();
  expect(screen.getByText("D89DDF3A7D80D89DDF3A7D80")).toBeInTheDocument();
  expect(screen.getByText("F9097F334FC4F9097F334FC4")).toBeInTheDocument();
});

test("ZoneOverview devices is optional", () => {
  const zoneProps2 = { ...zoneProps };
  delete zoneProps2.devices;
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps2} />
    </Router>,
  );
  expect(screen.getByText("Living room")).toBeInTheDocument();
});

test("clicking preset calls setZonePreset and updates state", async () => {
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>,
  );
  // Click one of the Eco preset buttons (there are multiple cards, each with preset buttons)
  const ecoButtons = screen.getAllByLabelText("Eco");
  await userEvent.click(ecoButtons[0]);
  expect(setZonePreset).toHaveBeenCalledWith(
    installationId,
    zoneProps.id,
    DeviceStatus.Eco,
  );
});

test("clicking off calls setZonePowerOff", async () => {
  render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>,
  );
  const offButtons = screen.getAllByLabelText("Off");
  await userEvent.click(offButtons[0]);
  expect(setZonePowerOff).toHaveBeenCalledWith(installationId, zoneProps.id);
});

test("useEffect syncs power and status props to state", () => {
  const { rerender } = render(
    <Router>
      <ZoneOverview installationId={installationId} zone={zoneProps} />
    </Router>,
  );
  const updatedZone = {
    ...zoneProps,
    power: false,
    status: DeviceStatus.Eco,
  };
  rerender(
    <Router>
      <ZoneOverview installationId={installationId} zone={updatedZone} />
    </Router>,
  );
  // The Off button should now have active styling (power=false)
  const offButtons = screen.getAllByLabelText("Off");
  expect(offButtons[0].className).toContain("bg-zinc-100");
});
