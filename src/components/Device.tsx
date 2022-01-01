import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FunctionComponent,
} from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Button,
  ButtonGroup,
  Col,
  Form,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import {
  DeviceStatus,
  DeviceType,
  getDevice,
  setDevicePreset,
  updateDeviceTemperature,
} from "equation-connect";

interface TemperatureProps {
  temp: number;
  onTemperature(newTemperature: number): void;
}

const Temperature: FunctionComponent<TemperatureProps> = ({
  temp,
  onTemperature,
}) => (
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
);

interface PresetProps {
  currentStatus: DeviceStatus;
  onPreset(newStatus: DeviceStatus): void;
}

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const Preset: FunctionComponent<PresetProps> = ({
  currentStatus,
  onPreset,
}) => {
  const statusList = Object.keys(DeviceStatus);
  const [radioValue, setRadioValue] = useState<DeviceStatus>(currentStatus);
  const onChange = (e: ChangeEvent<FormControlElement>) => {
    const status =
      DeviceStatus[e.currentTarget.value as keyof typeof DeviceStatus];
    setRadioValue(status);
    onPreset(status);
  };
  return (
    <ButtonGroup className="mt-2">
      {statusList.map((status, idx) => (
        <ToggleButton
          key={status}
          id={`radio-${idx}`}
          type="radio"
          name="radio"
          value={status}
          checked={
            radioValue === DeviceStatus[status as keyof typeof DeviceStatus]
          }
          onChange={onChange}
        >
          {status}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

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
          <Temperature temp={temp} onTemperature={onTemperature} />
          <Preset
            currentStatus={device.data.status}
            onPreset={(status) => setDevicePreset(id!, status)}
          />
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
