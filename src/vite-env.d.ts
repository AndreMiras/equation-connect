/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GIT_DESCRIBE: string;
  VITE_OPEN_WEATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
