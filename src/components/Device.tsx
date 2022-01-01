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
  setDevicePowerOff,
  setDevicePreset,
  setDeviceBacklight,
  setDeviceBacklightOn,
  updateDeviceTemperature,
} from "equation-connect";

interface NumberInputProps {
  value: number;
  onChange(newValue: number): void;
  label: string;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({
  value,
  onChange,
  label,
}) => (
  <>
    <Form.Label htmlFor="input">{label}</Form.Label>
    <Col xs={7} sm={5} lg={3}>
      <InputGroup size="lg">
        <Button onClick={() => onChange(value - 0.5)}>-</Button>
        <Form.Control
          id="input"
          value={value}
          type="number"
          readOnly
          onChange={(value) => onChange(Number(value))}
        />
        <Button onClick={() => onChange(value + 0.5)}>+</Button>
      </InputGroup>
    </Col>
  </>
);

interface TemperatureProps {
  temp: number;
  onTemperature(newTemperature: number): void;
}

const Temperature: FunctionComponent<TemperatureProps> = ({
  temp,
  onTemperature,
}) => (
  <Form className="row">
    <NumberInput value={temp} onChange={onTemperature} label="Temperature" />
  </Form>
);
interface PowerOffProps {
  checked: boolean;
  onPowerOff(): void;
}

const PowerOff: FunctionComponent<PowerOffProps> = ({
  checked,
  onPowerOff,
}) => (
  <ToggleButton
    id="radio-off"
    type="radio"
    name="radio"
    value="off"
    checked={checked}
    onChange={() => onPowerOff()}
  >
    off
  </ToggleButton>
);

interface PresetProps {
  currentStatus: DeviceStatus;
  onPreset(newStatus: DeviceStatus): void;
  currentPower: boolean;
  onPowerOff(): void;
}

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const Preset: FunctionComponent<PresetProps> = ({
  currentStatus,
  onPreset,
  currentPower,
  onPowerOff,
}) => {
  const statusList = Object.keys(DeviceStatus);
  const [radioValue, setRadioValue] = useState<DeviceStatus>(currentStatus);
  const [power, setPower] = useState(currentPower);
  const onStatusChange = (e: ChangeEvent<FormControlElement>) => {
    const status =
      DeviceStatus[e.currentTarget.value as keyof typeof DeviceStatus];
    setRadioValue(status);
    setPower(true);
    onPreset(status);
  };
  const onPowerChange = () => {
    setPower(false);
    onPowerOff();
  };
  return (
    <ButtonGroup className="mt-2">
      <PowerOff onPowerOff={() => onPowerChange()} checked={!power} />
      {statusList.map((status, idx) => (
        <ToggleButton
          key={status}
          id={`radio-${idx}`}
          type="radio"
          name="radio"
          value={status}
          checked={
            power &&
            radioValue === DeviceStatus[status as keyof typeof DeviceStatus]
          }
          onChange={onStatusChange}
        >
          {status}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

interface BacklightProps {
  backlight: number;
  onBacklight(newBacklight: number): void;
  backlightOn: number;
  onBacklightOn(newBacklightOn: number): void;
}

const Backlight: FunctionComponent<BacklightProps> = ({
  backlight,
  onBacklight,
  backlightOn,
  onBacklightOn,
}) => {
  return (
    <Form>
      <NumberInput value={backlight} onChange={onBacklight} label="Backlight" />
      <NumberInput
        value={backlightOn}
        onChange={onBacklightOn}
        label="Backlight on"
      />
    </Form>
  );
};

const Device = (): JSX.Element => {
  const { id } = useParams<"id">();
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [temp, setTemp] = useState(0);
  const [backlight, setBacklight] = useState(0);
  const [backlightOn, setBacklightOn] = useState(0);
  const onTemperature = useCallback(
    (newTemperature: number) => {
      if (newTemperature === temp) return;
      setTemp(newTemperature);
      updateDeviceTemperature(id!, newTemperature);
    },
    [id, temp]
  );
  const onBacklight = useCallback(
    (newBacklight: number) => {
      if (newBacklight === backlight) return;
      setBacklight(newBacklight);
      setDeviceBacklight(id!, newBacklight);
    },
    [id, backlight]
  );
  const onBacklightOn = useCallback(
    (newBacklight: number) => {
      if (newBacklight === backlight) return;
      setBacklightOn(newBacklight);
      setDeviceBacklightOn(id!, newBacklight);
    },
    [id, backlightOn]
  );
  const onDevice = useCallback(
    (device: DeviceType) => {
      setDevice(device);
      onTemperature(device.data.temp);
      onBacklight(device.data.backlight);
      onBacklightOn(device.data.backlight_on);
    },
    [onTemperature, onBacklight, onBacklightOn]
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
            currentPower={device.data.power}
            onPowerOff={() => setDevicePowerOff(id!)}
          />
          <Backlight
            backlight={device.data.backlight}
            onBacklight={onBacklight}
            backlightOn={device.data.backlight_on}
            onBacklightOn={onBacklightOn}
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
