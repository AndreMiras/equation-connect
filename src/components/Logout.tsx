import { logout } from "equation-connect";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { anonymousUser, UserContext } from "../context/provider";

const Logout = () => {
  const { setUser } = useContext(UserContext);

  const onLogout = async () => {
    logout();
    setUser(anonymousUser);
  };

  const onLogoutClick = () => onLogout();

  return (
    <Button type="submit" onClick={onLogoutClick}>
      Logout
    </Button>
  );
};

export default Logout;
