import React, { useContext } from "react";
import { UserContext } from "../context/provider";
import Login from "./Login";
import Logout from "./Logout";

const LoginOrLogout = (): JSX.Element => {
  const { user } = useContext(UserContext);
  return user.isAnonymous ? <Login /> : <Logout />;
};

export default LoginOrLogout;
