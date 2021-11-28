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
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
        <Card.Text>TODO: weather widget</Card.Text>
      </Card.Body>
    </Card>
    <ZonesOverview zones={zones} />
  </div>
);

export default Installation;
