import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mb-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
