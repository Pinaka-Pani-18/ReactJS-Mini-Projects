import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
