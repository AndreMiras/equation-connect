import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { UserContextProvider } from "./context/provider";
import { ThemeProvider } from "./context/theme";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
