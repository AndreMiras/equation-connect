import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";

library.add(fas, fab);

const App = (): JSX.Element => (
  <div className="App">
    <Header />
  </div>
);

export default App;
