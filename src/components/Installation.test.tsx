import { screen } from "@testing-library/react";

import { renderWithProviders } from "../test-utils";
import Installation from "./Installation";

vi.mock("equation-connect", () => ({
  DeviceStatus: { Ice: "ice", Eco: "eco", Comfort: "comfort" },
  setZonePreset: vi.fn(),
  setZonePowerOff: vi.fn(),
}));

vi.mock("react-open-weather", () => ({
  __esModule: true,
  default: ({ locationLabel }: { locationLabel: string }) => (
    <div data-testid="react-weather">{locationLabel}</div>
  ),
  useOpenWeather: () => ({
    data: null,
    isLoading: false,
    errorMessage: "",
  }),
}));

vi.mock("./ZonesOverview", () => ({
  default: ({ installationId }: { installationId: string }) => (
    <div data-testid="zones-overview">{installationId}</div>
  ),
}));

const installation = {
  name: "My Home",
  location: "Paris",
  latitude: 48.8566,
  longitude: 2.3522,
  zones: {},
};

test("renders installation name in accordion header", () => {
  renderWithProviders(
    <Installation id="inst-1" installation={installation as any} />
  );
  expect(screen.getByText("My Home")).toBeInTheDocument();
});

test("renders debug panel with JSON", () => {
  renderWithProviders(
    <Installation id="inst-1" installation={installation as any} />
  );
  expect(screen.getByText("Debug")).toBeInTheDocument();
});

test("renders ZonesOverview with installation id", () => {
  renderWithProviders(
    <Installation id="inst-1" installation={installation as any} />
  );
  expect(screen.getByTestId("zones-overview")).toHaveTextContent("inst-1");
});

test("shows missing API key warning when env var is absent", () => {
  const original = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  import.meta.env.VITE_OPEN_WEATHER_API_KEY = "";
  renderWithProviders(
    <Installation id="inst-1" installation={installation as any} />
  );
  expect(
    screen.getByText(/VITE_OPEN_WEATHER_API_KEY environment variable missing/i)
  ).toBeInTheDocument();
  import.meta.env.VITE_OPEN_WEATHER_API_KEY = original;
});

test("renders weather widget when API key is set", () => {
  import.meta.env.VITE_OPEN_WEATHER_API_KEY = "test-key";
  renderWithProviders(
    <Installation id="inst-1" installation={installation as any} />
  );
  expect(screen.getByTestId("react-weather")).toBeInTheDocument();
  import.meta.env.VITE_OPEN_WEATHER_API_KEY = "";
});
