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
  zones: ZonesOverviewType;
}

interface InstallationsType {
  [key: string]: InstallationType;
}

export type {
  ZoneOverviewType,
  ZonesOverviewType,
  InstallationType,
  InstallationsType,
};
