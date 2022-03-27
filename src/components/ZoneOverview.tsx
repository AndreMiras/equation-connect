import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import {
  DeviceStatus,
  ZoneOverviewType,
  setZonePowerOff,
  setZonePreset,
} from "equation-connect";
import Preset from "./Preset";

interface ZoneOverviewProps {
  installationId: string;
  zone: ZoneOverviewType;
}
const ZoneOverview: FC<ZoneOverviewProps> = ({ installationId, zone }) => {
  const [statusState, setStatusState] = useState(DeviceStatus.Comfort);
  const [powerState, setPowerState] = useState(false);
  const { id, name, type, comfort, eco, temp, power, mode, devices, status } =
    zone;
  const devicesCount = devices ? Object.keys(devices).length : 0;
  const devicesList = devices
    ? Object.keys(devices).map((device) => (
        <li key={device}>
          <Link to={`/devices/${device}`}>{device}</Link>
        </li>
      ))
    : null;
  const onPreset = (newStatus: DeviceStatus) => {
    setZonePreset(installationId, id!, newStatus);
    setStatusState(newStatus);
    setPowerState(true);
  };
  const onPowerOff = () => {
    setZonePowerOff(installationId, id!);
    setPowerState(false);
  };
  useEffect(() => {
    setPowerState(power);
    setStatusState(status);
  }, [power, status]);
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
          <Preset
            name={`options-${id}`}
            status={statusState}
            onPreset={onPreset}
            power={powerState}
            onPowerOff={onPowerOff}
          />
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
