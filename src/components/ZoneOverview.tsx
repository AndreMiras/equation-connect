import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import { ZoneOverviewType } from "../types";

const ZoneOverview: FunctionComponent<ZoneOverviewType> = ({
  id,
  type,
  comfort,
  eco,
  temp,
  power,
  mode,
  devices,
}) => (
  <div>
    <h2>Zone Overview {id}</h2>
    <Card>
      <Card.Body>
        <ul>
          <li>type: {type}</li>
          <li>comfort: {comfort}</li>
          <li>eco: {eco}</li>
          <li>temp: {temp}</li>
          <li>power: {power}</li>
          <li>mode: {mode}</li>
          <li>devices: {JSON.stringify(devices, null, 2)}</li>
        </ul>
      </Card.Body>
    </Card>
  </div>
);

export default ZoneOverview;
