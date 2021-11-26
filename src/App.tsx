import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Installations from "./components/Installations";
import Header from "./components/Header";
import { UserContext } from "./context/provider";

library.add(fas, fab);

const App = (): JSX.Element => {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Container>{user.isAnonymous ? null : <Installations />}</Container>
    </div>
  );
};

export default App;
