import React, { FC } from "react";
import ZoneOverview from "./ZoneOverview";
import { ZonesOverviewType } from "equation-connect";

interface ZonesOverviewProps {
  installationId: string;
  zones: ZonesOverviewType;
}

const ZonesOverview: FC<ZonesOverviewProps> = ({ installationId, zones }) => (
  <>
    {zones &&
      Object.keys(zones).map((key) => (
        <ZoneOverview
          key={key}
          installationId={installationId}
          zone={zones[key]}
        />
      ))}
  </>
);

export default ZonesOverview;
