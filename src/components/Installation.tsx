import React, { FunctionComponent } from "react";
import { Accordion, Alert } from "react-bootstrap";
// @ts-ignore
import ReactWeather, { useOpenWeather } from "react-open-weather";
import ZonesOverview from "./ZonesOverview";
import { InstallationType } from "equation-connect/dist/types";

interface InstallationProps {
  installation: InstallationType;
}

const Installation: FunctionComponent<InstallationProps> = ({
  installation,
}) => {
  const { name, location, latitude, longitude, zones } = installation;
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    lat: latitude.toString(),
    lon: longitude.toString(),
    lang: "en",
    unit: "metric",
  });
  const missingApiKeyMessage = (
    <Alert variant="warning">
      REACT_APP_OPEN_WEATHER_API_KEY environment variable missing.
    </Alert>
  );
  return (
    <div>
      <Accordion className="mb-3" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{name}</Accordion.Header>
          <Accordion.Body>
            {"REACT_APP_OPEN_WEATHER_API_KEY" in process.env ? (
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

      <ZonesOverview zones={zones} />
    </div>
  );
};

export default Installation;
