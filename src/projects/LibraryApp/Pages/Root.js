import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/NavbarAndFooter/Navbar";

function LibraryRootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LibraryRootLayout;
