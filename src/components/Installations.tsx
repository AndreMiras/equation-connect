import { getInstallations, InstallationsType } from "equation-connect";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/provider";
import Installation from "./Installation";

const Installations = () => {
  const [installations, setInstallations] = useState<InstallationsType | null>(
    null,
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
      setInstallations(await getInstallations(user.uid));
    };
    fetch();
  }, [user.uid]);

  return (
    <div>
      {installations &&
        Object.keys(installations).map((key) => (
          <Installation key={key} id={key} installation={installations[key]} />
        ))}
    </div>
  );
};

export default Installations;
