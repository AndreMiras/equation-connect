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

  return (
    <div>
      <h2>Radiator Overview {id}</h2>
      <Card>
        <Card.Body>
          {device === null ? null : (
            <ul>
              <li>name: {device.data.name}</li>
              <li>temp: {device.data.temp}</li>
              <li>temp_calc: {device.data.temp_calc}</li>
              <li>temp_probe: {device.data.temp_probe}</li>
            </ul>
          )}
        </Card.Body>
      </Card>
      Debug:
      <Card>
        <Card.Body>
          <pre>{JSON.stringify(device, null, 2)}</pre>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Device;
