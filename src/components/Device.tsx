import React from "react";
import { Card } from "react-bootstrap";

const Device = (): JSX.Element => {
  const [id, name, type, comfort, eco, temp, power, mode, devices] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ];
  return (
    <div>
      <h2>Radiator Overview {id}</h2>
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
    </div>
  );
};

export default Device;
