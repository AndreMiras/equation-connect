import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const Login = (): JSX.Element => (
  <Form className="d-flex">
    <Form.Control
      type="email"
      placeholder="Email"
      className="me-2"
      aria-label="Email"
    />
    <Form.Control
      type="password"
      placeholder="Password"
      className="me-2"
      aria-label="Password"
    />
    <Button>Login</Button>
  </Form>
);

export default Login;
