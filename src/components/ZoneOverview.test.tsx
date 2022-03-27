import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { ZoneOverviewType, DeviceStatus } from "equation-connect";
import { registerIcons } from "../utils/helpers";
import ZoneOverview from "./ZoneOverview";

registerIcons();

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
