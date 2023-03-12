import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../Components/Navbar/Navbar";
import { RestaurantContextProvider } from "../Store/restaurant-context";

function RestaurantRootLayout() {
  return (
    <div className='restaurant__bg-image'>
      <RestaurantContextProvider>
        <RestaurantNavbar />
        <Outlet />
      </RestaurantContextProvider>
    </div>
  );
}

export default RestaurantRootLayout;
