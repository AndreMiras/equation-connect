import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../utils/firebase";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = async () => {
    try {
      const user = await login(email, password);
      console.log("user:", user);
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
