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
    active:
      "bg-sky-50 text-sky-500 border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800",
    idle: "text-sky-400 hover:bg-sky-50 dark:text-sky-500 dark:hover:bg-sky-950",
  },
  Eco: {
    active:
      "bg-emerald-50 text-emerald-500 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
    idle: "text-emerald-400 hover:bg-emerald-50 dark:text-emerald-500 dark:hover:bg-emerald-950",
  },
  Comfort: {
    active:
      "bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
    idle: "text-amber-400 hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-950",
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
            ? "border-edge-strong bg-inset text-fg-muted"
            : "border-transparent text-fg-subtle hover:bg-inset"
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
