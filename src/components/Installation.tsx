import { InstallationType } from "equation-connect";
import { FC } from "react";
import { Accordion, Alert } from "react-bootstrap";
// @ts-expect-error react-open-weather has no type declarations
import ReactWeather, { useOpenWeather } from "react-open-weather";

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
  const missingApiKeyMessage = (
    <Alert variant="warning">
      VITE_OPEN_WEATHER_API_KEY environment variable missing.
    </Alert>
  );
  return (
    <div>
      <Accordion className="mb-3" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{name}</Accordion.Header>
          <Accordion.Body>
            {import.meta.env.VITE_OPEN_WEATHER_API_KEY ? (
              <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={location}
                unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
                showForecast
              />
            ) : (
              missingApiKeyMessage
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Debug</Accordion.Header>
          <Accordion.Body>
            <pre>{JSON.stringify(installation, null, 2)}</pre>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ZonesOverview installationId={id} zones={zones} />
    </div>
  );
};

export default Installation;
