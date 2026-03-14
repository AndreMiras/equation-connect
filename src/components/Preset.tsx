import { DeviceStatus } from "equation-connect";
import { Leaf, Power, Snowflake, Sun } from "lucide-react";
import { FC } from "react";

interface PresetProps {
  name?: string;
  status: DeviceStatus;
  onPreset(newStatus: DeviceStatus): void;
  power: boolean;
  onPowerOff(): void;
}

const iconsMap = {
  Ice: Snowflake,
  Eco: Leaf,
  Comfort: Sun,
};

const colorsMap = {
  Ice: {
    active: "bg-sky-50 text-sky-500 border-sky-200",
    idle: "text-sky-400 hover:bg-sky-50",
  },
  Eco: {
    active: "bg-emerald-50 text-emerald-500 border-emerald-200",
    idle: "text-emerald-400 hover:bg-emerald-50",
  },
  Comfort: {
    active: "bg-amber-50 text-amber-500 border-amber-200",
    idle: "text-amber-400 hover:bg-amber-50",
  },
};

const Preset: FC<PresetProps> = ({ status, onPreset, power, onPowerOff }) => {
  const statusList = Object.keys(DeviceStatus);
  const currentValue = !power ? "off" : status;

  return (
    <div className="flex gap-1">
      <button
        onClick={onPowerOff}
        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
          currentValue === "off"
            ? "border-zinc-300 bg-zinc-100 text-zinc-500"
            : "border-transparent text-zinc-400 hover:bg-zinc-100"
        }`}
        aria-label="Off"
      >
        <Power className="h-4 w-4" />
      </button>
      {statusList.map((s) => {
        const key = s as keyof typeof iconsMap;
        const Icon = iconsMap[key];
        const colors = colorsMap[key];
        const value = DeviceStatus[key];
        const isActive = power && status === value;
        return (
          <button
            key={s}
            onClick={() => onPreset(value)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              isActive ? colors.active : `border-transparent ${colors.idle}`
            }`}
            aria-label={s}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};

export default Preset;
