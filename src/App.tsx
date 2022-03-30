import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { registerIcons } from "./utils/helpers";
import Home from "./components/Home";
import Header from "./components/Header";
import Device from "./components/Device";

registerIcons();

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="devices/:id" element={<Device />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
