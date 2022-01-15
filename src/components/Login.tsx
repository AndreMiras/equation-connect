import React, { useCallback, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, Auth } from "firebase/auth";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { anonymousUser, User, UserContext } from "../context/provider";
import { auth, init, login, FirebaseConfig } from "equation-connect";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useContext(UserContext);

  const registerOnAuthStateChanged = useCallback(
    (auth: Auth) => {
      onAuthStateChanged(auth, (currentUser) => {
        const user = currentUser === null ? anonymousUser : currentUser;
        setUser(user);
      });
    },
    [setUser]
  );

  useEffect(() => {
    registerOnAuthStateChanged(auth!);
  }, [setUser, registerOnAuthStateChanged]);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = async () => {
    try {
      const user: User = await login(email, password);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const onConfig = (conf: FirebaseConfig) => {
    const { auth } = init(conf);
    registerOnAuthStateChanged(auth);
  };

  const onLoginClick = (e: React.MouseEvent<HTMLElement>) => onLogin();

  const onFormSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <Form className="d-flex" onSubmit={onFormSubmit}>
      <Form.Control
        type="email"
        placeholder="Email"
        className="me-2"
        aria-label="Email"
        onChange={onEmailChange}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        className="me-2"
        aria-label="Password"
        onChange={onPasswordChange}
      />
      <Dropdown as={ButtonGroup}>
        <Button type="submit" onClick={onLoginClick}>
          Login
        </Button>

        <Dropdown.Toggle split id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => onConfig(FirebaseConfig.EquationConnect)}
          >
            Equation Login
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onConfig(FirebaseConfig.RointeConnect)}>
            Rointe Login
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
};

export default Login;
