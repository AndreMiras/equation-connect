import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getDevice } from "../utils/firebase";
import { DeviceType } from "../types";

const Device = (): JSX.Element => {
  const { id } = useParams<"id">();
  const [device, setDevice] = useState<DeviceType | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setDevice(await getDevice(id!));
    };
    fetch();
  }, [id, setDevice]);

  return device === null ? (
    <div />
  ) : (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{device.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {device.data.temp}&deg;
          </Card.Subtitle>
          <Card.Text>
            <ul>
              <li>id: {id}</li>
              <li>temp_calc: {device.data.temp_calc}&deg;</li>
              <li>temp_probe: {device.data.temp_probe}&deg;</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Debug</Card.Title>
          <Card.Text>
            <pre>{JSON.stringify(device, null, 2)}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Device;
