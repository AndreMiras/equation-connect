import {
  database,
  deviceDataByIdPath,
  DeviceDataType,
  DeviceStatus,
  DeviceType,
  getDevice,
  setDeviceBacklight,
  setDeviceBacklightOn,
  setDeviceNominalPower,
  setDevicePowerOff,
  setDevicePreset,
  updateDeviceTemperature,
} from "equation-connect";
import { onValue, ref } from "firebase/database";
import { ArrowLeft, Lightbulb, LightbulbOff, Minus, Plus } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

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
  <div>
    {label && (
      <label className="mb-2 block text-sm font-medium text-fg-muted">
        {label}
      </label>
    )}
    <div className="inline-flex items-center gap-3">
      <button
        onClick={() => onChange(value - step)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-fg-subtle transition hover:border-edge-strong hover:text-fg-secondary"
        aria-label={`Decrease ${label || "value"}`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-16 text-center text-lg font-medium tabular-nums text-fg">
        {value}
      </span>
      <button
        onClick={() => onChange(value + step)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-fg-subtle transition hover:border-edge-strong hover:text-fg-secondary"
        aria-label={`Increase ${label || "value"}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  </div>
);

interface SimplifiedBacklightProps {
  value: boolean;
  onChange(value: boolean): void;
}

const SimplifiedBacklight: FC<SimplifiedBacklightProps> = ({
  value,
  onChange,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-fg-muted">
      Backlight
    </label>
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
          value
            ? "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400"
            : "border-edge text-fg-subtle hover:border-edge-strong"
        }`}
      >
        <Lightbulb className="h-4 w-4" /> On
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
          !value
            ? "border-edge-strong bg-inset text-fg-secondary"
            : "border-edge text-fg-subtle hover:border-edge-strong"
        }`}
      >
        <LightbulbOff className="h-4 w-4" /> Off
      </button>
    </div>
  </div>
);

const Device = () => {
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
    [id, temp],
  );

  const onBacklight = useCallback(
    (newBacklight: number) => {
      if (newBacklight === backlight) return;
      setBacklight(newBacklight);
      setDeviceBacklight(id!, newBacklight);
    },
    [id, backlight],
  );

  const onBacklightOn = useCallback(
    (newBacklight: number) => {
      if (newBacklight === backlightOn) return;
      setBacklightOn(newBacklight);
      setDeviceBacklightOn(id!, newBacklight);
    },
    [id, backlightOn],
  );

  const onNominalPower = useCallback(
    (newNominalPower: number) => {
      if (newNominalPower === nominalPower) return;
      setNominalPower(newNominalPower);
      setDeviceNominalPower(id!, newNominalPower);
    },
    [id, nominalPower],
  );

  const onDeviceData = useCallback((deviceData: DeviceDataType) => {
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
    [onDeviceData],
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
    if (!database) throw new Error("database is not initialized");
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

  if (device === null) {
    return (
      <div className="py-12 text-center text-fg-subtle">Loading device...</div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-fg-muted no-underline hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to devices
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-fg">{device.data.name}</h1>
      </div>

      {/* Main Controls */}
      <div className="mb-6 rounded-2xl border border-edge bg-card p-6">
        <div className="mb-8 text-center">
          <div className="mb-1 text-6xl font-extralight text-fg">
            {temp}
            <span className="text-2xl text-fg-subtle">°C</span>
          </div>
          <p className="text-sm text-fg-subtle">Target temperature</p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              onClick={() => onTemperature(temp - 0.5)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-edge text-fg-subtle transition hover:border-edge-strong hover:text-fg-secondary"
              aria-label="Decrease temperature"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-sm text-fg-subtle">step 0.5°C</span>
            <button
              onClick={() => onTemperature(temp + 0.5)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-edge text-fg-subtle transition hover:border-edge-strong hover:text-fg-secondary"
              aria-label="Increase temperature"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-3 block text-sm font-medium text-fg-muted">
            Mode
          </label>
          <Preset
            status={status}
            onPreset={onPreset}
            power={power}
            onPowerOff={onPowerOff}
          />
        </div>

        <SimplifiedBacklight
          value={Boolean(backlightOn)}
          onChange={(value) => onBacklightOn(Number(value))}
        />
      </div>

      {/* Sensor Readings */}
      <div className="mb-6 rounded-2xl border border-edge bg-card p-6">
        <h2 className="mb-4 text-sm font-medium text-fg-muted">
          Sensor readings
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-fg-subtle">Calculated temp</span>
            <span className="text-fg-secondary">{device.data.temp_calc}°C</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-fg-subtle">Probe temp</span>
            <span className="text-fg-secondary">
              {device.data.temp_probe}°C
            </span>
          </div>
        </div>
      </div>

      {/* Advanced */}
      <details className="mb-6 rounded-2xl border border-edge bg-card">
        <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-fg-muted hover:text-fg-secondary">
          Advanced settings
        </summary>
        <div className="space-y-6 border-t border-edge-subtle px-6 py-6">
          <NumberInput
            value={backlight}
            onChange={onBacklight}
            label="Backlight"
            step={1}
          />
          <NumberInput
            value={backlightOn}
            onChange={onBacklightOn}
            label="Backlight On"
            step={1}
          />
          <NumberInput
            value={nominalPower}
            onChange={onNominalPower}
            label="Nominal Power"
            step={1}
          />
        </div>
      </details>

      {/* Debug */}
      <details className="mb-6 rounded-2xl border border-edge bg-card">
        <summary className="cursor-pointer px-6 py-4 text-sm font-medium text-fg-muted hover:text-fg-secondary">
          Debug
        </summary>
        <div className="border-t border-edge-subtle px-6 py-4">
          <pre className="overflow-x-auto text-xs text-fg-muted">
            {JSON.stringify(device, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export { NumberInput, SimplifiedBacklight };
export default Device;
