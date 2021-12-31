import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  DeviceType,
  getDevice,
  updateDeviceTemperature,
} from "equation-connect";

const Device = (): JSX.Element => {
  const { id } = useParams<"id">();
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [temp, setTemp] = useState(0);
  const onTemperature = useCallback(
    (newTemperature: number) => {
      if (newTemperature === temp) return;
      setTemp(newTemperature);
      updateDeviceTemperature(id!, newTemperature);
    },
    [id, temp]
  );
  const onDevice = useCallback(
    (device: DeviceType) => {
      setDevice(device);
      onTemperature(device.data.temp);
    },
    [onTemperature]
  );

  useEffect(() => {
    const fetch = async () => {
      onDevice(await getDevice(id!));
    };
    fetch();
  }, [onDevice, id]);

  return device === null ? (
    <div />
  ) : (
    <Accordion className="mb-3" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{device.data.name}</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>id: {id}</li>
            <li>
              temp: {temp}&deg;
              <Slider
                min={7}
                max={30}
                step={0.5}
                defaultValue={device.data.temp}
                onAfterChange={(value) => onTemperature(value)}
              />
            </li>
            <li>temp_calc: {device.data.temp_calc}&deg;</li>
            <li>temp_probe: {device.data.temp_probe}&deg;</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Debug</Accordion.Header>
        <Accordion.Body>
          <pre>{JSON.stringify(device, null, 2)}</pre>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Device;
