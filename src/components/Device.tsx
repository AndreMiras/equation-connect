import { strict as assert } from "assert";
import { useCallback, useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  setDeviceNominalPower,
  updateDeviceTemperature,
} from "equation-connect";
import Preset from "./Preset";

interface NumberInputProps {
  value: number;
  onChange(newValue: number): void;
  label?: string;
  step: number;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  label,
  step,
}) => (
  <>
    {label ?? <Form.Label htmlFor="input">{label}</Form.Label>}
    <Col xs={8} sm={5} lg={3}>
      <InputGroup size="lg">
        <Button onClick={() => onChange(value - step)}>
          <FontAwesomeIcon icon={"minus"} />
        </Button>
        <Form.Control
          id="input"
          value={value}
          type="number"
          readOnly
          onChange={(value) => onChange(Number(value))}
        />
        <Button onClick={() => onChange(value + step)}>
          <FontAwesomeIcon icon={"plus"} />
        </Button>
      </InputGroup>
    </Col>
  </>
);

interface SimplifiedBacklightProps {
  value: boolean;
  onChange(value: boolean): void;
}

const SimplifiedBacklight: FC<SimplifiedBacklightProps> = ({
  value,
  onChange,
}) => (
  <ToggleButtonGroup
    type="radio"
    name="backlight-options"
    onChange={(value: number) => onChange(Boolean(value))}
    value={Number(value)}
    size="lg"
    className="mt-2"
  >
    <ToggleButton id="on" value={1}>
      <FontAwesomeIcon icon={"lightbulb"} /> On
    </ToggleButton>
    <ToggleButton id="off" value={0}>
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={"lightbulb"} />
        <FontAwesomeIcon icon={"slash"} />
      </span>{" "}
      Off
    </ToggleButton>
  </ToggleButtonGroup>
);

interface TemperatureProps {
  temp: number;
  onTemperature(newTemperature: number): void;
}

const Temperature: FC<TemperatureProps> = ({ temp, onTemperature }) => (
  <Form>
    <NumberInput value={temp} onChange={onTemperature} step={0.5} />
  </Form>
);

interface BacklightsProps {
  backlight: number;
  onBacklight(newBacklight: number): void;
  backlightOn: number;
  onBacklightOn(newBacklightOn: number): void;
}

const Backlights: FC<BacklightsProps> = ({
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

interface NominalPowerProps {
  nominalPower: number;
  onNominalPower(newBacklightOn: number): void;
}

const NominalPower: FC<NominalPowerProps> = ({
  nominalPower,
  onNominalPower,
}) => {
  return (
    <Form>
      <NumberInput
        value={nominalPower}
        onChange={onNominalPower}
        label="Nominal power"
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
  const [nominalPower, setNominalPower] = useState(0);
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
  const onNominalPower = useCallback(
    (newNominalPower: number) => {
      if (newNominalPower === nominalPower) return;
      setNominalPower(newNominalPower);
      setDeviceNominalPower(id!, newNominalPower);
    },
    [id, nominalPower]
  );
  const onDeviceData = useCallback((deviceData) => {
    const { backlight, backlight_on, temp, status, power, nominal_power } =
      deviceData;
    setTemp(temp);
    setBacklight(backlight);
    setBacklightOn(backlight_on);
    setNominalPower(nominal_power);
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
  const onPreset = (newStatus: DeviceStatus) => {
    setDevicePreset(id!, newStatus);
    setStatus(newStatus);
    setPower(true);
  };
  const onPowerOff = () => {
    setDevicePowerOff(id!);
    setPower(false);
  };
  const subscribeOnDeviceData = useCallback(() => {
    assert(database);
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
          <Row>
            <Col xs={12}>
              <Temperature temp={temp} onTemperature={onTemperature} />
            </Col>
            <Col xs={12}>
              <Preset
                status={status}
                onPreset={onPreset}
                power={power}
                onPowerOff={onPowerOff}
              />
            </Col>
            <Col>
              <SimplifiedBacklight
                value={Boolean(backlightOn)}
                onChange={(value) => onBacklightOn(Number(value))}
              />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Advanced</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>id: {id}</li>
            <li>temp_calc: {device.data.temp_calc}&deg;</li>
            <li>temp_probe: {device.data.temp_probe}&deg;</li>
          </ul>
          <Backlights
            backlight={backlight}
            onBacklight={onBacklight}
            backlightOn={backlightOn}
            onBacklightOn={onBacklightOn}
          />
          <NominalPower
            nominalPower={nominalPower}
            onNominalPower={onNominalPower}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Debug</Accordion.Header>
        <Accordion.Body>
          <pre>{JSON.stringify(device, null, 2)}</pre>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Device;
