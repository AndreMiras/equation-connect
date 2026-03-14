import React, { useContext } from "react";

import { UserContext } from "../context/provider";
import Installations from "./Installations";

const Home = (): JSX.Element => {
  const { user } = useContext(UserContext);
  return user.isAnonymous ? <div /> : <Installations />;
};

export default Home;
