import React, { useContext } from "react";
import Installations from "./Installations";
import { UserContext } from "../context/provider";

const Home = (): JSX.Element => {
  const { user } = useContext(UserContext);
  return user.isAnonymous ? <div /> : <Installations />;
};

export default Home;
