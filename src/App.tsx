import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./components/Home";
import Header from "./components/Header";

library.add(fas, fab);

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
