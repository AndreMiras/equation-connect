import {
  DeviceStatus,
  setZonePowerOff,
  setZonePreset,
  ZoneOverviewType,
} from "equation-connect";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router";

import Preset from "./Preset";

interface ZoneOverviewProps {
  installationId: string;
  zone: ZoneOverviewType;
}

const ZoneOverview: FC<ZoneOverviewProps> = ({ installationId, zone }) => {
  const [statusState, setStatusState] = useState(DeviceStatus.Comfort);
  const [powerState, setPowerState] = useState(false);
  const { id, name, temp, power, status } = zone;
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
    <div className="mb-8">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">
        {name}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((deviceId) => (
          <Link
            key={deviceId}
            to={`/devices/${deviceId}`}
            className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 no-underline transition hover:border-zinc-300 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500">
                {deviceId}
              </span>
              <StatusBadge power={powerState} status={statusState} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                {powerState ? (
                  <>
                    <span className="text-4xl font-light text-zinc-900">
                      {temp}
                    </span>
                    <span className="text-lg text-zinc-400">°C</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-light text-zinc-300">—</span>
                    <span className="text-lg text-zinc-300">°C</span>
                  </>
                )}
              </div>
              <div onClick={(e) => e.preventDefault()}>
                <Preset
                  name={`options-${id}`}
                  status={statusState}
                  onPreset={onPreset}
                  power={powerState}
                  onPowerOff={onPowerOff}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const StatusBadge: FC<{ power: boolean; status: DeviceStatus }> = ({
  power,
  status,
}) => {
  if (!power) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        Off
      </span>
    );
  }
  const colorMap: Record<string, string> = {
    [DeviceStatus.Ice]: "bg-sky-50 text-sky-600",
    [DeviceStatus.Eco]: "bg-emerald-50 text-emerald-600",
    [DeviceStatus.Comfort]: "bg-amber-50 text-amber-600",
  };
  const dotMap: Record<string, string> = {
    [DeviceStatus.Ice]: "bg-sky-500",
    [DeviceStatus.Eco]: "bg-emerald-500",
    [DeviceStatus.Comfort]: "bg-amber-500",
  };
  const labelMap: Record<string, string> = {
    [DeviceStatus.Ice]: "Ice",
    [DeviceStatus.Eco]: "Eco",
    [DeviceStatus.Comfort]: "Comfort",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorMap[status] || ""}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[status] || ""}`} />
      {labelMap[status] || status}
    </span>
  );
};

export default ZoneOverview;
