import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Form, Button } from "react-bootstrap";
import { anonymousUser, User, UserContext } from "../context/provider";
import { login } from "equation-connect";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      const user = currentUser === null ? anonymousUser : currentUser;
      setUser(user);
    });
  }, [setUser]);

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
      <Button type="submit" onClick={onLoginClick}>
        Login
      </Button>
    </Form>
  );
};

export default Login;
