import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { ZoneOverviewType } from "equation-connect";

interface ZoneOverviewProps {
  zone: ZoneOverviewType;
}
const ZoneOverview: FunctionComponent<ZoneOverviewProps> = ({ zone }) => {
  const { id, name, type, comfort, eco, temp, power, mode, devices } = zone;
  const devicesCount = devices ? Object.keys(devices).length : 0;
  const devicesList = devices
    ? Object.keys(devices).map((device) => (
        <li key={device}>
          <Link to={`/devices/${device}`}>{device}</Link>
        </li>
      ))
    : null;
  return (
    <Accordion className="mb-3" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>id: {id}</li>
            <li>temp: {temp}&deg;</li>
            <li>type: {type}</li>
            <li>comfort: {comfort}&deg;</li>
            <li>eco: {eco}&deg;</li>
            <li>temp: {temp}&deg;</li>
            <li>power: {power.toString()}</li>
            <li>mode: {mode}</li>
            <li>devices: {devicesCount}</li>
            <ul>{devicesList}</ul>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Debug</Accordion.Header>
        <Accordion.Body>
          <pre>{JSON.stringify(zone, null, 2)}</pre>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ZoneOverview;
