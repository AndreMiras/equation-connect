import React, { FunctionComponent } from "react";
import { Alert, Card } from "react-bootstrap";
// @ts-ignore
import ReactWeather, { useOpenWeather } from "react-open-weather";
import ZonesOverview from "./ZonesOverview";
import { InstallationType } from "../types";

const Installation: FunctionComponent<InstallationType> = ({
  name,
  power,
  location,
  latitude,
  longitude,
  zones,
}) => {
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
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
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
          </Card.Text>
        </Card.Body>
      </Card>
      <ZonesOverview zones={zones} />
    </div>
  );
};

export default Installation;
