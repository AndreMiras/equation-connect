import React, { FunctionComponent } from "react";
import ZoneOverview from "./ZoneOverview";
import { ZonesOverviewType } from "equation-connect";

interface ZonesOverviewProps {
  zones: ZonesOverviewType;
}

const ZonesOverview: FunctionComponent<ZonesOverviewProps> = ({ zones }) => (
  <>
    {zones &&
      Object.keys(zones).map((key) => (
        <ZoneOverview key={key} zone={zones[key]} />
      ))}
  </>
);

export default ZonesOverview;
