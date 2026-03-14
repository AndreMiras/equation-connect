import { HashRouter as Router, Route, Routes } from "react-router";

import Device from "./components/Device";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-fg">
      <Router>
        <Header />
        <main className="mx-auto mt-6 w-full max-w-6xl flex-1 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="devices/:id" element={<Device />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
