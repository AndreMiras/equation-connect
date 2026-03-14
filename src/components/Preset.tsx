import { FC } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeviceStatus } from "equation-connect";

interface PresetProps {
  name?: string;
  status: DeviceStatus;
  onPreset(newStatus: DeviceStatus): void;
  power: boolean;
  onPowerOff(): void;
}

const Preset: FC<PresetProps> = ({
  name = "options",
  status,
  onPreset,
  power,
  onPowerOff,
}) => {
  const statusList = Object.keys(DeviceStatus);
  const offValue = "off";
  const onChange = (value: string) => {
    if (value === offValue) {
      onPowerOff();
    } else {
      onPreset(value as DeviceStatus);
    }
  };
  const iconsMap = {
    Ice: "snowflake",
    Eco: "leaf",
    Comfort: "sun",
  };
  return (
    <ToggleButtonGroup
      type="radio"
      name={name}
      value={(!power && offValue) || status}
      onChange={onChange}
      size="lg"
      className="mt-2"
    >
      <ToggleButton id={`radio-${name}-off`} value={offValue}>
        <FontAwesomeIcon icon={"power-off"} /> Off
      </ToggleButton>
      {statusList.map((s, idx) => (
        <ToggleButton
          key={s}
          id={`radio-${name}-${idx}`}
          value={DeviceStatus[s as keyof typeof DeviceStatus]}
        >
          <FontAwesomeIcon
            icon={iconsMap[s as keyof typeof iconsMap] as IconName}
          />{" "}
          {s}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Preset;
