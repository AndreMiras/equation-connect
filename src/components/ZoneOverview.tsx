import { FC, ReactChild, ReactChildren, useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import { Accordion, ListGroup } from "react-bootstrap";
import {
  DeviceStatus,
  ZoneOverviewType,
  setZonePowerOff,
  setZonePreset,
} from "equation-connect";
import Preset from "./Preset";

interface ListGroupItemProps {
  children: ReactChild | ReactChildren;
  to: string;
}
const ListGroupItem: FC<ListGroupItemProps> = ({ children, to }) => {
  const href = useHref(to);
  return (
    <ListGroup.Item action href={href}>
      {children}
    </ListGroup.Item>
  );
};

interface DeviceListProps {
  devices: string[];
}
const DeviceList: FC<DeviceListProps> = ({ devices }) => (
  <ListGroup>
    {devices.map((device) => (
      <ListGroupItem key={device} to={`/devices/${device}`}>
        {device}
      </ListGroupItem>
    ))}
  </ListGroup>
);

interface ZoneOverviewProps {
  installationId: string;
  zone: ZoneOverviewType;
}
const ZoneOverview: FC<ZoneOverviewProps> = ({ installationId, zone }) => {
  const [statusState, setStatusState] = useState(DeviceStatus.Comfort);
  const [powerState, setPowerState] = useState(false);
  const { id, name, type, comfort, eco, temp, power, mode, status } = zone;
  const devices = Object.keys(zone.devices || {});
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
          <ListGroup>
            <DeviceList devices={devices} />
          </ListGroup>
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
        <Accordion.Header>Advanced</Accordion.Header>
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
      <Accordion.Item eventKey="2">
        <Accordion.Header>Debug</Accordion.Header>
        <Accordion.Body>
          <pre>{JSON.stringify(zone, null, 2)}</pre>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ZoneOverview;
