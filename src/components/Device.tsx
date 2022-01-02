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
import { ref, onValue } from "firebase/database";
import {
  DeviceStatus,
  DeviceType,
  database,
  deviceDataByIdPath,
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
  step: number;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({
  value,
  onChange,
  label,
  step,
}) => (
  <>
    <Form.Label htmlFor="input">{label}</Form.Label>
    <Col xs={7} sm={5} lg={3}>
      <InputGroup size="lg">
        <Button onClick={() => onChange(value - step)}>-</Button>
        <Form.Control
          id="input"
          value={value}
          type="number"
          readOnly
          onChange={(value) => onChange(Number(value))}
        />
        <Button onClick={() => onChange(value + step)}>+</Button>
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
    <NumberInput
      value={temp}
      onChange={onTemperature}
      label="Temperature"
      step={0.5}
    />
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
  status: DeviceStatus;
  onPreset(newStatus: DeviceStatus): void;
  power: boolean;
  onPowerOff(): void;
}

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const Preset: FunctionComponent<PresetProps> = ({
  status,
  onPreset,
  power,
  onPowerOff,
}) => {
  const statusList = Object.keys(DeviceStatus);
  const onStatusChange = (e: ChangeEvent<FormControlElement>) => {
    const newStatus =
      DeviceStatus[e.currentTarget.value as keyof typeof DeviceStatus];
    onPreset(newStatus);
  };
  const onPowerChange = () => {
    onPowerOff();
  };
  return (
    <ButtonGroup className="mt-2">
      <PowerOff onPowerOff={() => onPowerChange()} checked={!power} />
      {statusList.map((s, idx) => (
        <ToggleButton
          key={s}
          id={`radio-${idx}`}
          type="radio"
          name="radio"
          value={s}
          checked={
            power && status === DeviceStatus[s as keyof typeof DeviceStatus]
          }
          onChange={onStatusChange}
        >
          {s}
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
      <NumberInput
        value={backlight}
        onChange={onBacklight}
        label="Backlight"
        step={1}
      />
      <NumberInput
        value={backlightOn}
        onChange={onBacklightOn}
        label="Backlight on"
        step={1}
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
  const [status, setStatus] = useState(DeviceStatus.Comfort);
  const [power, setPower] = useState(false);
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
      if (newBacklight === backlightOn) return;
      setBacklightOn(newBacklight);
      setDeviceBacklightOn(id!, newBacklight);
    },
    [id, backlightOn]
  );
  const onDeviceData = useCallback((deviceData) => {
    const { backlight, backlight_on, temp, status, power } = deviceData;
    setTemp(temp);
    setBacklight(backlight);
    setBacklightOn(backlight_on);
    setStatus(status);
    setPower(power);
  }, []);
  const onDevice = useCallback(
    (device: DeviceType) => {
      setDevice(device);
      onDeviceData(device.data);
    },
    [onDeviceData]
  );

  const subscribeOnDeviceData = useCallback(() => {
    const path = deviceDataByIdPath(id!);
    const deviceDataRef = ref(database, path);
    onValue(deviceDataRef, (snapshot) => {
      const deviceData = snapshot.val();
      onDeviceData(deviceData);
    });
  }, [id, onDeviceData]);

  useEffect(() => {
    const fetch = async () => {
      onDevice(await getDevice(id!));
    };
    fetch();
    subscribeOnDeviceData();
  }, [onDevice, subscribeOnDeviceData, id]);

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
            status={status}
            onPreset={(status) => setDevicePreset(id!, status)}
            power={power}
            onPowerOff={() => setDevicePowerOff(id!)}
          />
          <Backlight
            backlight={backlight}
            onBacklight={onBacklight}
            backlightOn={backlightOn}
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
