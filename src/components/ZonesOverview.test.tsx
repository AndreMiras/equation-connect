import { screen } from "@testing-library/react";

import { renderWithProviders } from "../test-utils";
import ZonesOverview from "./ZonesOverview";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  setZonePreset: vi.fn(),
  setZonePowerOff: vi.fn(),
}));

vi.mock("./ZoneOverview", () => ({
  default: ({ zone }: { zone: { id: string } }) => (
    <div data-testid={`zone-${zone.id}`} />
  ),
}));

test("renders a ZoneOverview for each zone", () => {
  const zones = {
    z1: { id: "z1", name: "Zone 1" },
    z2: { id: "z2", name: "Zone 2" },
  };
  renderWithProviders(
    <ZonesOverview installationId="inst-1" zones={zones as any} />,
  );
  expect(screen.getByTestId("zone-z1")).toBeInTheDocument();
  expect(screen.getByTestId("zone-z2")).toBeInTheDocument();
});

test("renders nothing when zones is null", () => {
  const { container } = renderWithProviders(
    <ZonesOverview installationId="inst-1" zones={null as any} />,
  );
  expect(container.innerHTML).toBe("");
});

test("renders nothing when zones is empty", () => {
  const { container } = renderWithProviders(
    <ZonesOverview installationId="inst-1" zones={{} as any} />,
  );
  expect(container.innerHTML).toBe("");
});
