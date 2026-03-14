import { InstallationType } from "equation-connect";
import { CloudSun } from "lucide-react";
import { FC } from "react";
// @ts-expect-error react-open-weather has no type declarations
import { useOpenWeather } from "react-open-weather";

import ZonesOverview from "./ZonesOverview";

interface InstallationProps {
  id: string;
  installation: InstallationType;
}

const Installation: FC<InstallationProps> = ({ id, installation }) => {
  const { name, location, latitude, longitude, zones } = installation;
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    lat: latitude.toString(),
    lon: longitude.toString(),
    lang: "en",
    unit: "metric",
  });

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-fg">{name}</h1>
          <p className="mt-1 text-sm text-fg-muted">{location}</p>
        </div>
        {import.meta.env.VITE_OPEN_WEATHER_API_KEY ? (
          <div className="flex items-center gap-3 rounded-xl border border-edge bg-card px-4 py-2">
            <CloudSun className="h-5 w-5 text-amber-400" />
            <div className="text-sm">
              {isLoading ? (
                <span className="text-fg-subtle">Loading...</span>
              ) : errorMessage ? (
                <span className="text-red-500">Error</span>
              ) : (
                <span className="font-medium">
                  {data?.current?.temperature?.current}°C
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
            Weather API key missing
          </div>
        )}
      </div>

      <ZonesOverview installationId={id} zones={zones} />
    </section>
  );
};

export default Installation;
