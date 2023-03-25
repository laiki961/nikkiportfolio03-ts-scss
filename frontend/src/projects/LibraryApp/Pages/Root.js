import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/NavbarAndFooter/Navbar";

function LibraryRootLayout() {
  return (
    <section className='libraryRootLayout min-vh-100'>
      <Navbar />
      <Outlet />
    </section>
  );
}

export default LibraryRootLayout;
