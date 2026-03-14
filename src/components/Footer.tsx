import { Container, Navbar } from "react-bootstrap";

const Footer = () => (
  <Navbar bg="dark" variant="dark" className="mt-auto">
    <Container className="justify-content-center">
      <Navbar.Text>
        Open Equation Connect v{import.meta.env.VITE_GIT_DESCRIBE || "dev"}
      </Navbar.Text>
    </Container>
  </Navbar>
);

export default Footer;
