import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import ZonesOverview from "./ZonesOverview";
import { InstallationType } from "../types";

const Installation: FunctionComponent<InstallationType> = ({
  name,
  power,
  location,
  zones,
}) => (
  <div>
    <h2>Installation</h2>
    <Card>
      <Card.Body>
        <ul>
          <li>name: {name}</li>
          <li>location: {location}</li>
          <li>power: {power.toString()}</li>
        </ul>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <ZonesOverview zones={zones} />
      </Card.Body>
    </Card>
  </div>
);

export default Installation;
