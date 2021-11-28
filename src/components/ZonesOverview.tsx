import React, { FunctionComponent } from "react";
import ZoneOverview from "./ZoneOverview";
import { ZonesOverviewType } from "../types";

interface ZonesOverviewProps {
  zones: ZonesOverviewType;
}

const ZonesOverview: FunctionComponent<ZonesOverviewProps> = ({ zones }) => (
  <>
    {zones &&
      Object.keys(zones).map((key) => (
        <ZoneOverview key={key} {...zones[key]} />
      ))}
  </>
);

export default ZonesOverview;
