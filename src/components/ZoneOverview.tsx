import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ZoneOverviewType } from "../types";

const ZoneOverview: FunctionComponent<ZoneOverviewType> = ({
  id,
  name,
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
          <li>name: {name}</li>
          <li>type: {type}</li>
          <li>comfort: {comfort}</li>
          <li>eco: {eco}</li>
          <li>temp: {temp}</li>
          <li>power: {power.toString()}</li>
          <li>mode: {mode}</li>
          <li>devices: {JSON.stringify(devices, null, 2)}</li>
        </ul>
      </Card.Body>
    </Card>
    <ul>
      {Object.keys(devices).map((device) => (
        <li key={device}>
          <Link to={`/devices/${device}`}>{device}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ZoneOverview;
