import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import ZoneOverview from "./ZoneOverview";
import { ZonesOverviewType } from "../types";

interface ZonesOverviewProps {
  zones: ZonesOverviewType;
}

const ZonesOverview: FunctionComponent<ZonesOverviewProps> = ({ zones }) => {
  return (
    <div>
      <h2>Zones Overview</h2>
      <Card>
        <Card.Body>
          {zones &&
            Object.keys(zones).map((key) => (
              <ZoneOverview key={key} {...zones[key]} />
            ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ZonesOverview;
