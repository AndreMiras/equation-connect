import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion, Button, Col, Form, InputGroup } from "react-bootstrap";
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
            <li>temp_calc: {device.data.temp_calc}&deg;</li>
            <li>temp_probe: {device.data.temp_probe}&deg;</li>
          </ul>
          <Form className="row">
            <Form.Label htmlFor="temperature">Temperature</Form.Label>
            <Col xs={7} sm={5} lg={3}>
              <InputGroup size="lg">
                <Button onClick={() => onTemperature(temp - 0.5)}>-</Button>
                <Form.Control
                  id="temperature"
                  value={temp}
                  type="number"
                  readOnly
                  onChange={(value) => onTemperature(Number(value))}
                />
                <Button onClick={() => onTemperature(temp + 0.5)}>+</Button>
              </InputGroup>
            </Col>
          </Form>
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
