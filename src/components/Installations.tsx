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
      {installations &&
        Object.keys(installations).map((key) => (
          <Installation key={key} {...installations[key]} />
        ))}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Debug</Card.Title>
          <Card.Text>
            <pre>{JSON.stringify(installations, null, 2)}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Installations;
