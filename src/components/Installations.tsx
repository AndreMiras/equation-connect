import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/provider";
import { getInstallations } from "equation-connect";
import Installation from "./Installation";
import { InstallationsType } from "equation-connect/dist/types";

const Installations = (): JSX.Element => {
  const [installations, setInstallations] = useState<InstallationsType | null>(
    null
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
          <Installation key={key} installation={installations[key]} />
        ))}
    </div>
  );
};

export default Installations;
