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
  <>
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{temp}&deg;</Card.Subtitle>
        <Card.Text>
          <ul>
            <li>id: {id}</li>
            <li>type: {type}</li>
            <li>comfort: {comfort}&deg;</li>
            <li>eco: {eco}&deg;</li>
            <li>temp: {temp}&deg;</li>
            <li>power: {power.toString()}</li>
            <li>mode: {mode}</li>
            <li>devices: {Object.keys(devices).length}</li>
            <ul>
              {Object.keys(devices).map((device) => (
                <li key={device}>
                  <Link to={`/devices/${device}`}>{device}</Link>
                </li>
              ))}
            </ul>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  </>
);

export default ZoneOverview;
