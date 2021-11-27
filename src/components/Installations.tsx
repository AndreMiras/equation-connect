import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "../context/provider";
import { getInstallations } from "../utils/firebase";
import Installation from "./Installation";
import { InstallationsType } from "../types";

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
      <h2>Installations</h2>
      <Card>
        <Card.Body>
          {installations &&
            Object.keys(installations).map((key) => (
              <Installation key={key} {...installations[key]} />
            ))}
        </Card.Body>
      </Card>
      Debug:
      <Card>
        <Card.Body>
          <pre>{JSON.stringify(installations, null, 2)}</pre>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Installations;
