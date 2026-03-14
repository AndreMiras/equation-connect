import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router";

import Device from "./components/Device";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { registerIcons } from "./utils/helpers";

registerIcons();

const App = () => {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <Container className="mt-3 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="devices/:id" element={<Device />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
