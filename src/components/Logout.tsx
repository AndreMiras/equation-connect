import { logout } from "equation-connect";
import { useContext } from "react";

import { anonymousUser, UserContext } from "../context/provider";

const Logout = () => {
  const { setUser } = useContext(UserContext);

  const onLogout = async () => {
    logout();
    setUser(anonymousUser);
  };

  const onLogoutClick = () => onLogout();

  return (
    <button
      type="submit"
      onClick={onLogoutClick}
      className="text-sm text-zinc-500 hover:text-zinc-900"
    >
      Logout
    </button>
  );
};

export default Logout;
