import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext, anonymousUser } from "../context/provider";
import { logout } from "../utils/firebase";

const Logout = (): JSX.Element => {
  const { setUser } = useContext(UserContext);

  const onLogout = async () => {
    logout();
    setUser(anonymousUser);
  };

  const onLogoutClick = (e: React.MouseEvent<HTMLElement>) => onLogout();

  return (
    <Button type="submit" onClick={onLogoutClick}>
      Logout
    </Button>
  );
};

export default Logout;
