interface ZoneOverviewType {
  id: string;
  name: string;
  type: string;
  comfort: number;
  eco: number;
  temp: number;
  power: boolean;
  mode: string;
  devices: {
    [key: string]: boolean;
  };
}

interface ZonesOverviewType {
  [key: string]: ZoneOverviewType;
}

interface InstallationType {
  name: string;
  power: boolean;
  location: string;
  latitude: number;
  longitude: number;
  zones: ZonesOverviewType;
}

interface InstallationsType {
  [key: string]: InstallationType;
}

interface DeviceDataType {
  adelanto_enable: boolean;
  backlight: number;
  backlight_on: number;
  backlight_time: number;
  block_local: boolean;
  block_remote: boolean;
  buzzer: boolean;
  check_updates_now: boolean;
  check_updates_time: string;
  color: string;
  comfort: number;
  comfort_minus: number;
  eco: number;
  error_heating: boolean;
  error_low_wifi: boolean;
  error_temperature_probe: boolean;
  evolution: number;
  factory_test: boolean;
  gmt: number;
  ice: number;
  ice_mode: boolean;
  last_sync_datetime_app: number;
  last_sync_datetime_device: number;
  last_sync_datetime_tariff: number;
  mgmt_modules: number;
  mode: string;
  name: string;
  nominal_power: number;
  pilot_mode: boolean;
  pir_datetime: number;
  pir_mode: boolean;
  pir_status: boolean;
  power: boolean;
  product_version: string;
  schedule: string[];
  schedule_type: number;
  status: string;
  temp: number;
  temp_calc: number;
  temp_probe: number;
  timer_mode: boolean;
  timer_temp: number;
  timer_time: number;
  type: string;
  um_max_temp: number;
  um_min_temp: number;
  um_password: string;
  user_mode: boolean;
  windows_open_mode: boolean;
  windows_open_status: boolean;
}

interface DeviceFirmwareType {
  firmware_collective_device: string;
  firmware_datetime_device: number;
  firmware_version_device: string;
  manufacture_date: number;
}

interface DeviceStatsType {
  total_time: number;
  total_working_time: number;
}

interface DeviceType {
  installation: string;
  serialnumber: string;
  data: DeviceDataType;
  firmware: DeviceFirmwareType;
  stats: DeviceStatsType;
}

export type {
  ZoneOverviewType,
  ZonesOverviewType,
  InstallationType,
  InstallationsType,
  DeviceType,
};
